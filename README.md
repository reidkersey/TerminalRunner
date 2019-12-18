# Terminal Runner README

## Features

This extension makes it easy to work node, etc. into your VS code workflow

## Extension Settings

This extension contributes the following settings:

- `terminalRunner.folderPath`: The path that the terminal should start and execute commands in
- `terminalRunner.command`: The command/commands to run for each runnable
- `terminalRunner.name`: The name the user is presented with to choose the terminal
- `terminalRunner.terminalWindowName`: The name that the terminal window will display
- `terminalRunner.openAdditionalTerminal`: If checked, opens an additional terminal in the same directory once the commands in the first have been run. Useful when running 'npm run' or the like where the original terminal must remain open, but is not useable for running other commands
- `terminalRunner.delayCommand`: A delay (in seconds) between running each command in the terminal

## Release Notes

### 1.0.0

Initial release of Terminal Runner.
