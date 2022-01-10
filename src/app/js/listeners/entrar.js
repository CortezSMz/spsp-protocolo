const { stepIterator, warn } = require('./../util/Util')
const { join } = require('path')
const { entrar } = require('./../util/jobs')

module.exports = async (mainWindow, mainPage, dummyPage, username, password) => {
    const ite = stepIterator(entrar)

    while (ite.hasNext()) {
        const step = ite.next()

        const progress = (step.index / (entrar.length - 1))

        mainWindow.setProgressBar(progress)

        try {
            const res = await step.value.do(dummyPage, { username, password })

            if (step.value.title === "Verificando..." && res && typeof res === 'string') throw res
            else if (step.value.title === "Verificando..." && res && typeof res === 'boolean') {
                process.env.PASS = password
                mainWindow.flashFrame(true)
                mainWindow.setProgressBar(-1)
                mainWindow.loadFile(join(__dirname, './../../html/cadastrar.html'))
            }
        } catch (error) {
            console.log(error)
            mainWindow.flashFrame(true)
            mainWindow.setProgressBar(progress, { mode: 'error' })
            warn(mainPage, error)
            break
        } 
    }
}