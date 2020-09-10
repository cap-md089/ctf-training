const express = require('express');
const { join } = require('path');
const { urlencoded } = require('body-parser');

const flagInfo = require('./flags.json');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

const COOKIE_NAME = 'md089-ctf-flags';

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

	return parsedCookies[COOKIE_NAME].split(',');
};

const getFlagInfo = (flags) =>
	flags.map((flag) => flagInfo[flag]).filter((item) => !!item);

app.use(express.static('downloads'));

app.get('/', (req, res) => {
	const flags = getFlagInfo(getFlagsFromCookies(req.headers.cookie));

	res.render('index.pug', { flags, foundNewFlag: false, flagChecked: false });
});

app.post('/addflag', urlencoded({}), (req, res) => {
	const defaultFlags = getFlagInfo(getFlagsFromCookies(req.headers.cookie));

	const newFlag = req.body.flag;
	if (typeof newFlag !== 'string') {
		return res.render('index.pug', {
			flags: defaultFlags,
			foundNewFlag: false,
			flagChecked: false,
		});
	}

	const foundNewFlag = !!flagInfo[newFlag];

	if (getFlagsFromCookies(req.headers.cookie).includes(newFlag)) {
		return res.render('index.pug', {
			flags: defaultFlags,
			foundNewFlag: false,
			flagChecked: false,
		});
	}

	if (foundNewFlag) {
		res.cookie(
			COOKIE_NAME,
			[...getFlagsFromCookies(req.headers.cookie), newFlag].join(',')
		);
	}

	const flags = foundNewFlag
		? [
				...getFlagInfo(getFlagsFromCookies(req.headers.cookie)),
				flagInfo[newFlag],
		  ]
		: getFlagInfo(getFlagsFromCookies(req.headers.cookie));

	res.render('index.pug', { flags, foundNewFlag, flagChecked: true });
});

app.listen(process.env.PORT || 3000);
