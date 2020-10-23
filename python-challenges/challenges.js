module.exports = [
	{
		name: 'Learning math',
		startingCode: `# Python has the ability to
# do some basic math
#
# We can print out the result of
# some arithmetic by doing the following:

print(1 + 2)

# Try running this code!
# You should see a three on the side

# Now, make this code print the
# result of 9 times 6`,
		flag: 'tafGIGUm4ett',
		verifyOutput: (output, code) => !!output.match(/54/g),
	},
];
