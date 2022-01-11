const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    entrar: (username, password) => ipcRenderer.send('entrar', username, password),
    cadastrar: (assunto, interessado, funcionario, arquivo) => ipcRenderer.send('cadastrar', assunto, interessado, funcionario, arquivo),
    protocolar: (processo) => ipcRenderer.send('protocolar', processo),
    preencherFuncionarios: (setor) => ipcRenderer.send('preencherFuncionarios', setor)
})