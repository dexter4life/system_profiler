// "use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

// const os = require("os");
const si = require("systeminformation");
// const { ipcMain } = require("electron");
var osu = require("node-os-utils");
var cpu = osu.cpu;
const toast = require("powertoast");
const monitor = require("../lib/monitorevent.node");
const autobahn = require("autobahn");
const axios = require('axios').default;

// const TextSmart = require("textsmart");
// const tsjs = new TextSmart.Classifier();
// const fs = require("fs");
// const path = require("path");
// const csv = require("csvtojson");

// // listen for the "keypress" event
// let training_path = path.join(process.cwd(), "./", "train.csv");

// fs.stat(training_path, function(err, stats) {
//   if (err) {
//     monitor.ErrorMessage(err.message);
//     process.exit(1);
//     return;
//   }
//   csv()
//     .fromFile(training_path)
//     .then((jsonObj) => {
//       jsonObj.forEach((entry) => {
//         tsjs.train(entry.comment, entry.type);
//       });
//     });
// });

var currentSession = null;

const publicIp = require('public-ip');
var IP = null;
(async () => {
  var v4 = publicIp.v4({
    fallbackUrls: [
      'https://ifconfig.co/ip'
    ]
  });
  v4.then((value) => {
    IP = value;
  });
})();


var connection = new autobahn.Connection({
  url: `ws://18.191.252.189:9090/`,
  realm: "realm1",
});

async function createWindow() {

  connection.onopen = function (session) {
    currentSession = session;
    (async () => {
      var v4 = publicIp.v4({
        fallbackUrls: [
          'https://ifconfig.co/ip'
        ]
      });
      v4.then((value) => {
        session.publish('com.global.report')
        var id = require('crypto').randomBytes(10).toString('hex');
        session.publish("com.global.report", [{ active: true, id: id, ip: value }]);
      });
    })();
  };
  connection.onclose = function () {
    currentSession.publish("com.global.report", [{ active: false, id: require('crypto').randomBytes(10).toString('hex') }]);
  };

  connection.open();

  monitor.MonitorClick(function (sentence) {
    console.log(sentence);
    axios.post('http://18.191.252.189:3000/classifier', { data: sentence })
      .then(function (response) {
        var data = response.data[0];
        if (data != null && data != undefined) {
          toast({
            title: "System Profiler",
            message: "Detected an " + data.output,
            icon: "",
          }).catch((err) => {
            console.error(err);
          });
          currentSession.publish("com.global.report", [
            { type: data.output, sentence: sentence, ip: IP },
          ]);
        }
      })
      .catch(function (error) {
        console.log(error.data);
      });
  });

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  setInterval(() => {
    cpu.usage().then((cpuPercentage) => {
      win.webContents.send("cpu", {
        percentage: cpuPercentage,
        model: cpu.model(),
        count: cpu.count(),
      });
    });

    si.processes(function (data) {
      win.webContents.send("cpu-ex", {
        processCount: data.all,
        processData: data,
      });
    });

    si.networkConnections(function (data) {
      win.webContents.send("network-ex", { connections: data.length });
    });

    si.networkStats().then(function (data) {
      win.webContents.send("network-ex", { networkStats: data });
    });

    si.mem().then(function (data) {
      win.webContents.send("memory", data);
    });
  }, 1000);

  win.removeMenu();
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // Watch the path with the change listener and completion callback
    // var stalker = watchr.open(path, listener, next);

    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  connection.close();
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();

});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
