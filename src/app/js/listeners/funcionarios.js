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

    const element = await dummyPage.waitForSelector('#dropdownLotaMenuButton > strong > span')
    let unidade = await element.evaluate(el => el.textContent)
    
    unidade = /(\w{3})$/g.exec(unidade.trim())[0]

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