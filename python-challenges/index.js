const challenges = require('./challenges.js');
const tmp = require('tmp');
const child_process = require('child_process');
const express = require('express');
const { join } = require('path');
const pug = require('pug');
const { promisify } = require('util');
const { write } = require('fs');

const tmpPromise = (opts) =>
	new Promise((res, rej) => {
		tmp.file(opts, (err, file, fd, cleanup) => {
			if (err) {
				rej(err);
			}

			res([file, fd, cleanup]);
		});
	});
const writePromise = promisify(write);

const _editor = pug.compileFile(join(__dirname, 'editor.pug'));
const editor = (name, starterText, results, flag) =>
	_editor({
		name,
		templateText: starterText,
		results,
		flag,
	});

module.exports.isValidID = (id) => !!challenges[id];

module.exports.pageForID = (id) =>
	editor(challenges[id].name, challenges[id].startingCode);

module.exports.executeForID = async (id, code) => {
	const challenge = challenges[id];

	const result = await module.exports.executeCode(code);

	const doesPass = challenge.verifyOutput(result, code);

	if (doesPass) {
		return editor(challenge.name, code, result, challenge.flag);
	} else {
		return editor(challenge.name, code, result);
	}
};

// Executes Python code by writing it to a file and running python on that file
// Implements a timeout of 30 seconds; after 30 seconds, it will abort
module.exports.executeCode = async (code) => {
	const [file, fd, cleanup] = await tmpPromise();

	await writePromise(fd, code, 0, 'utf8');

	const pythonProcess = child_process.spawn('python', [file]);

	let processData = '';
	let processErr = '';

	pythonProcess.stdout.on('data', (data) => {
		processData += data.toString('utf8');
		processErr += data.toString('utf8');
	});

	pythonProcess.stderr.on('data', (data) => {
		processErr += data.toString('utf8');
	});

	try {
		await Promise.race([
			new Promise((resolve, reject) => {
				pythonProcess.on('close', (code) => {
					if (code !== 0) {
						reject(processErr);
					} else {
						resolve(processData);
					}
				});
			}),
			new Promise((_, reject) => {
				setTimeout(() => {
					reject('Code ran for too long without returning a result');

					pythonProcess.kill();
				}, 30000);
			}),
		]);

		return processData;
	} catch (e) {
		return e;
	} finally {
		cleanup();
	}
};

module.exports.executeCodeInEditor = async (code) => {
	const result = await module.exports.executeCode(code);

	return editor('Python scratchpad', code, result);
};

module.exports.pythonResources = express.static(join(__dirname, 'resources'));

module.exports.scratchpad = editor(
	'Python scratchpad',
	'print("Hello world!")'
);
