const {app, BrowserWindow} = require('electron')

app.on('ready', createWindow)

let mainWindow

function createWindow () {
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow()
  mainWindow.loadFile('index.html')
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
