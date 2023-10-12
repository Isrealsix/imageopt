const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

// Set env
process.env.NODE_ENV = 'development'

const isDev = process.env === 'development' ? true : false
const isMac = process.platform === 'darwin' ? true : false
let mainWindow;
let aboutWindow;
function createMainWindow () {
  mainWindow = new BrowserWindow({
    title: 'Image optimizer',
    width: 1280,
    height: 800,
    icon: './asswts/icons/Icon_256x256.png',
    resizable: false,
    backgroundColor: 'white'
  })
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
}

function createAboutWindow () {
  aboutWindow = new BrowserWindow({
    title: 'About Imageoptimizer',
    width: 300,
    height: 300,
    icon: './asswts/icons/Icon_256x256.png',
    resizable: isDev ? true : false,
    backgroundColor: 'white'
  })
  aboutWindow.loadURL(`file://${__dirname}/app/about.html`)
}

app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})


// if (isMac) {
//   menu.unshift({ role: 'appMenu' })
// }
const menu = [
  ...(isDev? [
    {
      label: 'Developer',
      submenu: [
        { role: 'reload'},
        { role: 'forcereload'},
        { type: 'separator'},
        { role: 'toggledevtools'}
      ]
    }
  ] : []),
  ...(isMac ? [{
    role: app.name,
    submenu: [
      {
        label: 'About',
        click: createAboutWindow
      }
    ]
  }] : []),
  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow
        }
      ]
    }
  ] : []),
  {
    role: 'fileMenu'
  }
]
app.on('ready', () => {
  createMainWindow()
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu)

  globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
  globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())
  mainWindow.on('ready', () => mainWindow = null)
})
