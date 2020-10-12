const express = require('express');
const { join } = require('path');
const { urlencoded } = require('body-parser');
const crypto = require('crypto-challenges');
const python = require('python-challenges');

const flagInfo = require('./flags.json');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

const COOKIE_NAME = 'md089-ctf-flags';

app.use('/downloads', express.static(join(__dirname, 'downloads')));
app.use('/pythonr', python.pythonResources);
// Export styles so that the web challenges can use them if they want
app.get('/styles.css', (req, res) =>
	res.sendFile(join(__dirname, 'views', 'includes', 'styles.css'))
);

const getFlagsFromCookies = (cookies) => {
	if (!cookies) {
		return [];
	}

	const splitCookies = cookies.split('; ');
	const splitKeyValues = splitCookies.map((pair) => pair.split('='));

	const parsedCookies = Object.fromEntries(splitKeyValues);

	if (!parsedCookies[COOKIE_NAME]) {
		return [];
	}

	return decodeURIComponent(parsedCookies[COOKIE_NAME]).split(',');
};

const getFlagInfo = (flags) =>
	flags.map((flag) => flagInfo[flag]).filter((item) => !!item);

app.get('/', (req, res) => {
	const rawFlags = getFlagsFromCookies(req.headers.cookie);
	const flags = getFlagInfo(rawFlags);

	res.render('index.pug', {
		rawFlags,
		flags,
		foundNewFlag: false,
		flagChecked: false,
	});
});

app.post('/addflag', urlencoded({}), (req, res) => {
	const cookieFlags = getFlagsFromCookies(req.headers.cookie);
	const defaultFlags = getFlagInfo(cookieFlags);

	const newFlag = req.body.flag;
	if (typeof newFlag !== 'string' || cookieFlags.includes(newFlag)) {
		return res.render('index.pug', {
			rawFlags: cookieFlags,
			flags: defaultFlags,
			foundNewFlag: false,
			flagChecked: false,
		});
	}

	const foundNewFlag = !!flagInfo[newFlag];

	if (foundNewFlag) {
		res.cookie(COOKIE_NAME, [...cookieFlags, newFlag].join(','));
	}

	const flags = foundNewFlag
		? [...defaultFlags, flagInfo[newFlag]]
		: defaultFlags;

	res.render('index.pug', {
		rawFlags: cookieFlags,
		flags,
		foundNewFlag,
		flagChecked: true,
	});
});

app.get('/crypto/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);

	if (isNaN(id) || !crypto[id]) {
		const rawFlags = getFlagsFromCookies(req.headers.cookie);
		const flags = getFlagInfo(rawFlags);

		res.render('index.pug', {
			rawFlags,
			flags,
			foundNewFlag: false,
			flagChecked: false,
		});
	} else {
		res.send(crypto[id]);
	}
});

app.get('/python', (req, res) => {
	res.send(python.scratchpad);
});

app.post('/python', urlencoded({}), async (req, res) => {
	if (typeof req.body.code !== 'string') {
		res.send(python.scratchpad);
		return;
	}

	const body = await python.executeCodeInEditor(req.body.code);

	res.send(body);
});

app.get('/python/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);

	if (isNaN(id) || !python.isValidID(id)) {
		res.send(python.scratchpad);
	} else {
		res.send(python.pageForID(id));
	}
});

app.post('/python/:id', urlencoded({}), async (req, res) => {
	const id = parseInt(req.params.id, 10);

	if (isNaN(id) || !python.isValidID(id)) {
		if (typeof req.body.code !== 'string') {
			res.send(python.scratchpad);
		} else {
			res.send(await python.executeCodeInEditor(req.body.code));
		}
	} else if (typeof req.body.code !== 'string') {
		res.send(python.scratchpad);
	} else {
		res.send(await python.executeForID(id, req.body.code));
	}
});

app.listen(process.env.PORT || 3000);
