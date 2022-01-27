const { stepIterator, sleep } = require('./../util/Util')
const { cadastrar } = require('../util/jobs')

module.exports = async (mainWindow, mainPage, dummyPage, assunto, interessado, funcionario, arquivo) => {
    const ite = stepIterator(cadastrar)
    let processo = '';

    while (ite.hasNext()) {
        const step = ite.next()

        const progress = (step.index / (cadastrar.length - 1))

        mainWindow.setProgressBar(progress)

        try {
            await mainPage.$eval('#enviar', (e, txt) => e.innerText = txt, step.value.title);

            const res = await step.value.do(dummyPage, {
                assunto,
                interessado,
                funcionario,
                arquivo,
                processo
            })

            if (res && res.processo) processo = res.processo.replace(/\s/gm, '')
        } catch (error) {
            console.log(error)
            await mainPage.$eval('#enviar', (e, txt) => e.innerText = txt, 'Algo deu errado, tentando de novo...');
            mainWindow.flashFrame(true)
            mainWindow.setProgressBar(progress, { mode: 'error' })
            ite.prev()
            await sleep(2500)
        }
        await sleep(250)
    }
    mainWindow.flashFrame(true)
    mainWindow.setProgressBar(-1)

    mainPage.$eval('#loading', e => e.setAttribute('hidden', 'true'))
    mainPage.$eval('#processo', (e, txt) => e.innerText = txt, processo);
    mainPage.$eval('#processo', e => e.removeAttribute('hidden'))
    mainPage.$eval('#processo-prep', e => e.removeAttribute('hidden'))
    mainPage.$eval('#protocolar', e => e.removeAttribute('hidden'))
}