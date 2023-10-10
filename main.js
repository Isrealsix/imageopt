const { app, BrowserWindow} = require('electron')

let mainWindow
function createMainWindow () {
  mainWindow = new BrowserWindow({
    title: 'Image optimizer',
    width: 1280,
    height: 800
  })
  mainWindow.loadURL('./app/index.html')
}

app.on('ready', createMainWindow)
