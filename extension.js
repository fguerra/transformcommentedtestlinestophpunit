const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('transformcommentedtestlinestophpunit.transformToUnitTest', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const { fileName } = document;
			let languageID = document.languageId;
			let languageIDValidates = getLanguageIDValidates(languageID);
			let fileNameValidates = getFileNameValidates(fileName);

			if ( languageIDValidates && fileNameValidates ) {
				const transformedLines = [];

				for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
					const line = document.lineAt(lineIndex);
					const transformedLine = getFormattedLineForUnitTest(line.text);
					if (transformedLine !== line.text) {
						transformedLines.push({ lineIndex, transformedLine });
					}
				}

				if (transformedLines.length > 0) {
					const edit = new vscode.WorkspaceEdit();
					transformedLines.forEach(({ lineIndex, transformedLine }) => {
						const line = document.lineAt(lineIndex);
						edit.replace(document.uri, line.range, transformedLine);
					});
					vscode.workspace.applyEdit(edit);
					vscode.window.showInformationMessage(`Transformed ${transformedLines.length} line(s) to PHP unit test functions`);
				} else {
					vscode.window.showInformationMessage('No lines containing "//test" or "// test" found');
				}
			}
			else {
				vscode.window.showInformationMessage('This command can only be executed in PHP files ending with "Test.php"');
			}
		}
	});

	context.subscriptions.push(disposable);
}

/**
 * Gets the formatted line for a unit test
 * @param {string} lineText Line text
 * @returns string
 */
function getFormattedLineForUnitTest(lineText) {
	const regex = /(^[\t\s]*)\/\/\s?test\s(.*)/i;
	const matches = regex.exec(lineText);
	if (matches && matches.length > 2) {
		const indentation = matches[1];
		const functionName = getCamelCasedString(matches[2]);
		return `${indentation}public function test${functionName}(){\n${indentation}\t\n${indentation}}`;
	}
	return lineText;
}

/**
 * Converts a sentence to camel case
 * @param {string} sentence Sentence to convert to camel case
 * @returns string
 */
function getCamelCasedString(sentence) {
	const words = sentence.split(/\s+/);
	const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
	return capitalizedWords.join('');
}

/**
 * Checks if the language ID validates for this extension
 * @param {string} languageID Language ID
 * @returns bool
 */
function getLanguageIDValidates( languageID ) {
	let lowercasedLanguageID = languageID.toLowerCase();
	let validates = false;
	if( lowercasedLanguageID === 'php' ) {
		validates = true;
	}
	else {
		validates = false;
	}
	return validates;
}

/**
 * Checks if the file name is valid for this extension
 * @param {string} fileName File name
 * @returns bool
 */
function getFileNameValidates(fileName) {
	let validates = false;
	if (fileName.endsWith('Test.php')) {
		validates = true;
	}
	else {
		validates = false;
	}
	return validates;
}

/**
 * Deactivate method (currently does nothing)
 */
function deactivate() {}

module.exports = {
	activate,
	deactivate,
	getCamelCasedString,
	getFormattedLineForUnitTest,
	getLanguageIDValidates,
	getFileNameValidates
}
