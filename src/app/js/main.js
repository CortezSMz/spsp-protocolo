const { BrowserWindow, app, ipcMain, screen } = require('electron')
if (require('electron-squirrel-startup')) return app.quit();

const pie = require('puppeteer-in-electron')
const puppeteer = require('puppeteer-core')
const { join } = require('path')

const { entrar, cadastrar, protocolar } = require('./listeners')
const { popup } = require('./util/Util')

const main = async () => {
    await pie.initialize(app)

    const browser = await pie.connect(app, puppeteer)

    const primaryScreen = screen.getPrimaryDisplay()

    const mainWindow = new BrowserWindow({
        icon: join(__dirname, '../img/sem-papel.ico'),
        autoHideMenuBar: true,
        resizable: false,
        width: 486,
        height: 650,
        webPreferences: {
            preload: join(__dirname, '/preload.js'),
            contextIsolation: true
        },        
    })

    await mainWindow.loadFile('./html/index.html')
    mainWindow.on('will-move', (_, pos) => {
        if (dummyWindow.isVisible()) dummyWindow.setPosition(pos.x + 482, pos.y, true)
    })

    const dummyWindow = new BrowserWindow({
        icon: join(__dirname, '../img/sem-papel.ico'),
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        parent: mainWindow,
        width: 486,
        height: 690,
        x: primaryScreen.bounds.width / 2 + 241,
        y: primaryScreen.bounds.height / 2,
        webPreferences: {
            contextIsolation: true,
        }
    })

    dummyWindow.removeMenu()
    dummyWindow.setIgnoreMouseEvents(true);
    dummyWindow.hide()

    const mainPage = await pie.getPage(browser, mainWindow)
    const dummyPage = await pie.getPage(browser, dummyWindow)

    ipcMain.on('entrar', async(_, username, password) => {
        popup(
            entrar(mainWindow, mainPage, dummyPage, username, password),
            mainWindow,
            dummyWindow
        )
    })

    ipcMain.on('cadastrar', (_, assunto, interessado, supervisor, arquivo) => {
        popup(
            cadastrar(mainWindow, mainPage, dummyPage, assunto, interessado, supervisor, arquivo),
            mainWindow,
            dummyWindow
        )
    })

    ipcMain.on('protocolar', (_, processo) => {
        popup(
            protocolar(mainPage, dummyPage, processo),
            mainWindow,
            dummyWindow
        )
    })
}

main()