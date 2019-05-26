import { app, BrowserWindow, Menu } from "electron";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    // 居中打开
    center: true,
    // show: false,
    title: "标注工具",
    backgroundColor: "#EEE"
  });

  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  let template = [
    {
      role: 'window',
      label: "文件",
      submenu: [
        {
          label: "打开...",
          accelerator: "CmdOrCtrl+O"
        }
      ]
    },
    {
      label: "数据",
      submenu: [
        {
          label: "下载",
          accelerator: "CmdOrCtrl+D",
          click() {
            // alert("123");
          }
        },
        {
          label: "上传",
          accelerator: "CmdOrCtrl+U"
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  // 在 macOS 中应用程序菜单的第一个项目的标签总是你的应用程序的名字, 
  // 无论你设置什么标签。 如要更改它, 请修改应用程序包的  Info. plist  文件。 
  // https://electronjs.org/docs/api/menu

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
