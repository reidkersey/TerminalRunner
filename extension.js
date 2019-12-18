// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode")

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "terminal runner" is now active!'
  )

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.terminalRunner",
    async () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      console.log("hi!")
      vscode.window.showInformationMessage("Extesnsion running")
      let names = vscode.workspace
        .getConfiguration()
        .get("name")
        .split(";")
      let config = vscode.workspace.getConfiguration().get("conf.runAPI")
      console.log("config: ", config)
      console.log("names", JSON.stringify(names))
      let name = await vscode.window.showQuickPick(names, null)
      console.log("choice", name)

      if (name !== undefined) {
        let index = names.findIndex(nam => {
          return name === nam
        })
        console.log("index: ", index)
        let terminalName = vscode.workspace
          .getConfiguration()
          .get("terminalWindowName")
          .split(";")[index]
        console.log("terminalName: ", terminalName)
        let folderPath = vscode.workspace
          .getConfiguration()
          .get("folderPath")
          .split(";")[index]
        console.log("folderPath: ", folderPath)
        let command = vscode.workspace
          .getConfiguration()
          .get("command")
          .split(";")[index]
        console.log("command: ", command)
        let termOptions = {
          cwd: folderPath,
          name: terminalName
        }
        let terminal = vscode.window.createTerminal(termOptions)
        terminal.show()
        let commands = command.split("|~|")
        for (let i = 0; i < commands.length; i++) {
          terminal.sendText(commands[i])
          if (i + 1 < commands.length)
            await timeout(
              vscode.workspace.getConfiguration().get("delayCommand")
            )
        }
        // vscode.commands.executeCommand("workbench.action.terminal.focus")
        if (
          vscode.workspace.getConfiguration().get("openAdditionalTerminal") ===
          true
        ) {
          let termOptions1 = {
            cwd: folderPath,
            name: "Working - " + name
          }
          let terminal1 = vscode.window.createTerminal(termOptions1)
          terminal1.show()
        }
      }
      //
    }
  )

  context.subscriptions.push(disposable)
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

function timeout(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}

module.exports = {
  activate,
  deactivate
}
