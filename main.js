const isDev = require('electron-is-dev');
const {app, BrowserWindow} = require('electron')
if (isDev) {
    function createWindow () {
        // Cree la fenetre du navigateur.
        win = new BrowserWindow({width: 800, height: 600})

        win.webContents.openDevTools()

        // et charge le index.html de l'application.
        win.loadFile('index.html')
    }
} else {
    const {app, BrowserWindow,autoUpdater, dialog} = require('electron')
    require('update-electron-app')()
    const server = 'https://your-deployment-url.com'
    const feed = `${server}/update/${process.platform}/${app.getVersion()}`

    autoUpdater.setFeedURL(feed)

    setInterval(() => {
        autoUpdater.checkForUpdates()
    }, 60000)

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
        const dialogOpts = {
            type: 'info',
            buttons: ['Restart', 'Later'],
            title: 'Application Update',
            message: process.platform === 'win32' ? releaseNotes : releaseName,
            detail: 'A new version has been downloaded. Restart the application to apply the updates.'
        }

        dialog.showMessageBox(dialogOpts, (response) => {
            if (response === 0) autoUpdater.quitAndInstall()
        })
    })

    autoUpdater.on('error', message => {
        console.error('There was a problem updating the application')
        console.error(message)
    })
    function createWindow () {
        // Cree la fenetre du navigateur.
        win = new BrowserWindow({width: 800, height: 600})

        win.webContents.openDevTools()

        // et charge le index.html de l'application.
        win.loadFile('index.html')
    }
}
  
  app.on('ready', createWindow)