const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const myExtension = require("../../extension");

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('getCamelCasedString returns the expected value', () => {
		const str = 'get name returns the expected value';
		const expected = 'GetNameReturnsTheExpectedValue';
		const result = myExtension.getCamelCasedString(str);
		assert.strictEqual(result, expected);
	});

	test('getFormattedLineForUnitTest returns a string', () => {
		const str = '//test get name returns the expected value';
		const result = myExtension.getFormattedLineForUnitTest(str);
		assert.strictEqual(typeof result, 'string');
	});

	test('getFormattedLineForUnitTest returns the expected value', () => {
		const str = '//test get name returns the expected value';
		const result = myExtension.getFormattedLineForUnitTest(str);
		const expected = 'public function testGetNameReturnsTheExpectedValue(){\n'+
						'\t\n'+
						'}';
		assert.strictEqual(result, expected);
	});

	test('getFormattedLineForUnitTest returns the expected value with the expected indentation', () => {
		const str = '		//test get name returns the expected value';
		const result = myExtension.getFormattedLineForUnitTest(str);
		const expected = '		public function testGetNameReturnsTheExpectedValue(){\n'+
						'		\t\n'+
						'		}';
		assert.strictEqual(result, expected);
	});

	test('getLanguageIDValidates returns false when given a language other than PHP', () => {
		let validates = myExtension.getLanguageIDValidates("js");
		assert.strictEqual(validates, false);
	});

	test('getLanguageIDValidates returns true when given PHP', () => {
		let validates = myExtension.getLanguageIDValidates("php");
		assert.strictEqual(validates, true);
	});

	test('getLanguageIDValidates returns true when given a case-insensitive PHP', () => {
		let validates = myExtension.getLanguageIDValidates("PhP");
		assert.strictEqual(validates, true);
	});

	test('getFileNameValidates returns false when given a file name that doesnt end with Test.php', () => {
		let validates = myExtension.getFileNameValidates("someFile.php");
		assert.strictEqual(validates, false);
	});

	test('getFileNameValidates returns false when given a file name that doesnt end with case-sensitive Test.php', () => {
		let validates = myExtension.getFileNameValidates("myClasstest.php");
		assert.strictEqual(validates, false);
	});

	test('getFileNameValidates returns true when given a file name that ends with case-sensitive Test.php', () => {
		let validates = myExtension.getFileNameValidates("myClassTest.php");
		assert.strictEqual(validates, true);
	});
	
});
