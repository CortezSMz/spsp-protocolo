const { stepIterator } = require('./../util/Util')
const { funcionarios } = require('./../util/jobs')

const buscarFuncionarios = async (dummyPage) => {
    const setores = {
        'ARQ': [],
        'AT': [],
        'CAF': [],
        'CIE': [],
        'CRH': [],
        'ESE': [],
        'NA': [],
        'NAD': [],
        'NAP': [],
        'NCS': [],
        'NFI': [],
        'NFP': [],
        'NIT': [],
        'NOM': [],
        'NPE': [],
        'NRM': [],
        'NVE': [],
        'PROT': [],
    }

    await dummyPage.waitForSelector('#inicio > div.col.col-12.col-sm-4.col-md-auto.ml-md-auto.mb-2 > a')
    const element = await dummyPage.$eval('body > div:nth-child(2) > div.row.pt-2.pb-2.mb-3.submenusp > div.col.col-12.col-md-6.text-right > div.dropdown.d-inline', el => el.innerText)

    const unidade = /(\w{3})$/g.exec(element.trim())[0]

    for (const setor of Object.keys(setores).values()) {
        const ite = stepIterator(funcionarios)

        while (ite.hasNext()) {
            const step = ite.next()

            try {
                const res = await step.value.do(dummyPage, {
                    unidade,
                    setor
                })

                if (res && res.unidade) unidade = res.unidade

                if (res && res.funcionarios) {
                    for (const funcionario of res.funcionarios) {
                        setores[setor].push({
                          nome: funcionario[0].normalize("NFD").replace(/\p{Diacritic}/gu, ""),
                          seduc: funcionario[1]
                        })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return setores
}

const preencherFuncionarios = async (mainPage, setor, setores) => {
    const funcionarios = await mainPage.waitForSelector("#funcionario", { visible: true, timeout: 30000 });

    await funcionarios.evaluate((el, setor, setores) => {
        el.innerHTML = '<option value="selecione">Selecione...</option>'
        if (!setores[setor]) return

        for (const s of setores[setor]) {
            el.innerHTML += `<option value="${s.seduc}">${s.nome}</option>`
        }
    }, setor, setores);
}

module.exports = { buscarFuncionarios, preencherFuncionarios }