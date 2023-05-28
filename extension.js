// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "testytest" is now active!');
	console.log('new console log');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('testytest.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from testytest!');
	});

	context.subscriptions.push(disposable);


	let transformToUnitTestDisposable = vscode.commands.registerCommand('testytest.transformToUnitTest', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            const { start, end } = selection;
            const selectedLines = [];
            for (let lineIndex = start.line; lineIndex <= end.line; lineIndex++) {
                selectedLines.push(document.lineAt(lineIndex));
            }

            const transformedLines = selectedLines.map(line => {
                const text = line.text;
                const transformedLine = getFormattedLineForUnitTest(text);
                return transformedLine !== text ? transformedLine : undefined;
            }).filter(Boolean);

            if (transformedLines.length > 0) {
                const edit = new vscode.WorkspaceEdit();
                transformedLines.forEach((transformedLine, index) => {
                    const line = selectedLines[index];
                    edit.replace(document.uri, line.range, transformedLine);
                });
                vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage(`Transformed ${transformedLines.length} line(s) to PHP unit test functions`);
            } else {
                vscode.window.showInformationMessage('No lines containing "//test" or "// test" found');
            }
        }
    });

    context.subscriptions.push(disposable, transformToUnitTestDisposable);
}

function getFormattedLineForUnitTest(lineText) {
    const regex = /\/\/\s?test\s(.*)/i;
    const matches = regex.exec(lineText);
    if (matches && matches.length > 1) {
        const functionName = getCamelCasedString(matches[1]);
        return `public function test${functionName}() {\n\t\n}`;
    }
    return lineText;
}

function getCamelCasedString(str) {
    const words = str.split(/\s+/);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join('');
}




// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
