import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { logger } from '../renderer/src/utils/logger'
import { autoUpdater } from 'electron-updater'

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
      // webSecurity: false, // 禁用 CSP 和其他安全策略
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('payment', async (event, id) => {
    logger.info(`event : ${event}, payment id: ${id}`)
  })

  createWindow()

  ipcMain.handle('updateVersion', async () => {
    // 检查是否是开发环境, 如果是开发环境, 需要检测更新, 把 isPackaged 设置为 false
    if (is.dev) {
      logger.info('当前是开发环境 : ' + app.isPackaged)

      // 设置isUpdaterActive, 为了启用 autoUpdater
      autoUpdater.isUpdaterActive = () => true
      app.isPackaged === false &&
        Object.defineProperty(app, 'isPackaged', {
          get(): boolean {
            logger.info('变动开发环境中: 为了启用 autoUpdater')
            return true
          }
        })
    }

    logger.info(`update config path : ${resolve(__dirname, '..', '..', 'dev-app-update.yml')}`)
    // 设置更新配置文件
    autoUpdater.updateConfigPath = resolve(__dirname, '..', '..', 'dev-app-update.yml')
    // 进行更新检查
    autoUpdater.on('checking-for-update', () => {
      logger.info('checking-for-update')
    })
    // 更新可用
    autoUpdater.on('update-available', () => {
      logger.info('update-available')
    })
    // 有新版本
    autoUpdater.on('update-not-available', () => {
      logger.info('update-not-available')
    })
    // 更新下载失败
    autoUpdater.on('error', (e) => {
      logger.info('error', e)
    })

    // 下载更新
    autoUpdater.on('update-downloaded', (/* event */) => {
      logger.info('update-downloaded')
      // 通知渲染进程更新
      dialog
        .showMessageBox(mainWindow, {
          type: 'info',
          title: '更新提示',
          message: '更新已下载,是否立即更新?',
          buttons: ['是', '否']
        })
        .then((result) => {
          if (result.response === 0) {
            autoUpdater.quitAndInstall()
          }
        })
    })

    autoUpdater.checkForUpdatesAndNotify()
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // 添加托盘
  // const tray = new Tray('./electron.svg')
  // const conTextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1', type: 'radio' },
  //   { label: 'Item2', type: 'radio' }
  // ])
  //
  // tray.setContextMenu(conTextMenu)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
