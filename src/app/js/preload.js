const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    entrar: (username, password) => ipcRenderer.send('entrar', username, password),
    cadastrar: (assunto, interessado, supervisor, arquivo) => ipcRenderer.send('cadastrar', assunto, interessado, supervisor, arquivo),
    protocolar: (processo) => ipcRenderer.send('protocolar', processo)
})