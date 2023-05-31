# transformcommentedtestlinestophpunit VSCode Extension

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Dependencies](#dependencies)
- [How to use](#how-to-use)
- [Extension Settings](#extension-settings)
- [Known Issues](#known-issues)
- [Release Notes](#release-notes)
- [Contributing](#contributing)
- [License](#license)
- [Feedback](#feedback)
- [Acknowledgements](#acknowledgements)

## Description
The `transformcommentedtestlinestophpunit` is a Visual Studio Code extension tailored for PHP developers who use PHPUnit for testing. This extension enables a streamlined process of creating PHPUnit test methods from comments, thus making your coding and testing process faster and more efficient.

The extension operates by scanning your active PHP file for any line comments starting with `//test` or `// test`. It then transforms these comments into boilerplate PHPUnit methods, laying the groundwork for your test cases. The extension is designed to only work on PHP files that end with `Test.php`, ensuring it only functions in the context of your test files.

Remember to replace the method body with your test implementation to make the test meaningful.

## Features
- Transforms `//test` or `// test` comments into PHPUnit methods quickly and efficiently.
- Exclusive functionality for PHP files ending with `Test.php`.

## Dependencies
The `transformcommentedtestlinestophpunit` extension depends on the following packages:

- `@types/vscode` version `^1.70.0`
- `@types/glob` version `^8.1.0`
- `@types/mocha` version `^10.0.1`
- `@types/node` version `16.x`
- `eslint` version `^8.39.0`
- `glob` version `^8.1.0`
- `mocha` version `^10.2.0`
- `typescript` version `^5.0.4`
- `@vscode/test-electron` version `^2.3.0`

## How to use
1. Open a PHP file in Visual Studio Code that ends with `Test.php`.
2. Add a comment line starting with `//test` or `// test` and write the name of your test function. For example: `//test should return true`
3. Press `F1` to open the Command Palette.
4. Start typing `Transform commented lines to PHPUnit methods` and select it.
5. The extension will replace the `//test` comment with a PHPUnit method.

## Extension Settings
This extension currently does not offer any configurable settings.

## Known Issues
No known issues at this time.

## Release Notes
### 0.0.1
Initial release of transformcommentedtestlinestophpunit

## Contributing
If you have suggestions for improving transformcommentedtestlinestophpunit, or want to report a bug, open an issue! Contributions of all kinds are welcome.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Feedback
If you have any feedback, please reach out on GitHub.

## Acknowledgements
This project follows the all-contributors specification. Contributions of any kind are welcome!
