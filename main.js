const { app, BrowserWindow} = require('electron')

// Set env
process.env.NODE_ENV = 'development'

const isDev = process.env === 'development' ? true : false
const isMac = process.platform === 'darwin' ? true : false
let mainWindow
function createMainWindow () {
  mainWindow = new BrowserWindow({
    title: 'Image optimizer',
    width: 1280,
    height: 800,
    icon: './asswts/icons/Icon_256x256.png',
    resizable: isDev ? true : false
  })
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
}

app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})

app.on('ready', createMainWindow)
