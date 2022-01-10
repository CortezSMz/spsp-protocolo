const { stepIterator, sleep } = require('./../util/Util')
const { protocolar } = require('../util/jobs')

module.exports = async (mainPage, dummyPage, processo) => {
    const ite = stepIterator(protocolar)

    while (ite.hasNext()) {
        const step = ite.next()

        try {
            await mainPage.$eval('#enviar', (e, txt) => e.innerText = txt, step.value.title);

            await step.value.do(dummyPage, {
                processo
            })
        } catch (error) {
            console.log(error)
            ite.prev()
            await sleep(2500)
        }
        await sleep(250)
    }
}