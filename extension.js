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
            const { fileName } = document;

            // Check if the file is a PHP file and the name ends with "Test.php"
            if (document.languageId === 'php' && fileName.endsWith('Test.php')) {
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
        return `public function test${functionName}(){\n\t\n}\n\n`;
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
