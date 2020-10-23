const pug = require('pug');
const { join } = require('path');

const ceaser1 = pug.compileFile(join(__dirname, 'challenges', 'ceaser.pug'));
const alphabetIndex1 = pug.compileFile(
	join(__dirname, 'challenges', 'emails.pug')
);

module.exports = [
	ceaser1({ challenge_name: 'Do you like salad?' }),
	alphabetIndex1({ challenge_name: 'ABCs' }),
];
