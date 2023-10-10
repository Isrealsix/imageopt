const { app, BrowserWindow} = require('electron')

function createMainWindow () {
  const mainWindow = new BrowserWindow({
    title: 'Image optimizer',
    width: 500,
    height: 500
  })
}

app.on('ready', createMainWindow)
