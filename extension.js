// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
 function activate(context) {
    console.log('Congratulations, your extension "testytest" is now active!');

    let disposable = vscode.commands.registerCommand('testytest.transformToUnitTest', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const { fileName } = document;

            // Check if the file is a PHP file and the name ends with "Test.php"
            if (document.languageId === 'php' && fileName.endsWith('Test.php')) {
                const { start, end } = selection;
                const selectedLines = [];
                for (let lineIndex = start.line; lineIndex <= end.line; lineIndex++) {
                    selectedLines.push(document.lineAt(lineIndex));
                }

                const transformedLines = selectedLines.map((line, index) => {
                    const text = line.text;
                    const transformedLine = getFormattedLineForUnitTest(text);
                    if (index === selectedLines.length - 1) {
                        return transformedLine + '\n';
                    }
                    return transformedLine;
                });

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
            } else {
                vscode.window.showInformationMessage('This command can only be executed in PHP files ending with "Test.php"');
            }
        }
    });

    context.subscriptions.push(disposable);
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
