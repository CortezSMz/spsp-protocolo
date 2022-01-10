module.exports = [
    {
        title: 'Criando folha líder...',
        do: (page) => page.goto('https://www.documentos.spsempapel.sp.gov.br/sigaex/app/expediente/doc/editar?modelo=71806&criandoAnexo=false&criandoSubprocesso=false', { waitUntil: 'networkidle0' })
    },
    {
        title: 'Preenchendo interessado...',
        do: (page, { interessado }) => page.type('#Interessado', interessado)
    },
    {
        title: 'Preenchendo assunto...',
        do: (page, { assunto }) => page.type('#Assunto', assunto)
    },
    {
        title: 'Salvando folha líder...',
        do: (page) => Promise.all([
            page.click('#btnGravar'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Assinando folha líder...',
        do: (page) => Promise.all([
            page.click('#assinar'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Assinando folha líder...',
        do: (page) => Promise.all([
            page.click('#bot-assinar'),
            page.waitForSelector('#senhaOk', { visible: true, timeout: 15000 })
        ])
    },
    {
        title: 'Preenchendo senha...',
        do: (page) => page.type('#senhaUsuarioSubscritor', process.env.PASS)
    },
    {
        title: 'Confirmando...',
        do: (page) => Promise.all([
            page.click('#senhaOk'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Pegando número do processo...',
        do: async (page) => {
            const element = await page.$("#page > div.row.mt-3 > div > h2")
            const processo = (await page.evaluate(element => element.textContent, element)).replace('Voltar', '-A')
            return { processo }
        }
    },
    {
        title: 'Incluindo anexo...',
        do: (page) => Promise.all([
            page.click('#incluir-documento'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Mudando modelo...',
        do: (page, { processo }) => page.goto(`https://www.documentos.spsempapel.sp.gov.br/sigaex/app/expediente/doc/editar?modelo=57306&mobilPaiSel.sigla=${processo}&criandoAnexo=true&criandoSubprocesso=false`, { waitUntil: 'networkidle0' })
    },
    {
        title: 'Enviando arquivo...',
        do: async (page, { arquivo }) => {
            const [ fileChooser ] = await Promise.all([
                page.waitForFileChooser(),
                page.click('#arquivo')
            ])
        
            await fileChooser.accept([ arquivo ])
        }
    },
    {
        title: 'Preenchendo assunto...',
        do: (page, { assunto }) => page.type('#Assunto', assunto)
    },
    {
        title: 'Preenchendo espécie...',
        do: (page) => page.select('#especie', 'Ofício')
    },
    {
        title: 'Preenchendo tipo de conferência...',
        do: (page) => page.select('#conferencia', 'Cópia autenticada administrativamente')
    },
    {
        title: 'Salvando anexo...',
        do: (page) => Promise.all([
            page.click('#btnGravar'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Autenticando anexo...',
        do: (page) => Promise.all([
            page.click('#autenticar'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Autenticando com senha...',
        do: (page) => Promise.all([
            page.click('#bot-autenticar'),
            page.waitForSelector('#senhaOk', { visible: true, timeout: 15000 })
        ])
    },
    {
        title: 'Preenchendo senha...',
        do: (page) => page.type('#senhaUsuarioSubscritor', process.env.PASS)

    },
    {
        title: 'Confirmando senha...',
        do: (page) => Promise.all([
            page.click('#senhaOk'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Indo para a página de encaminhamento...',
        do: (page, { processo }) => page.goto(`https://www.documentos.spsempapel.sp.gov.br/sigaex/app/expediente/mov/transferir?sigla=${processo}`)
    },
    {
        title: 'Selecionando tipo...',
        do: (page) => Promise.all([
            page.select('#frm > div:nth-child(8) > div.col.col-3 > div > select', '2'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Selecionando supervisor...',
        do: (page, { supervisor }) => page.type('#formulario_responsavelSel_sigla', supervisor)
    },
    {
        title: 'Confirmando supervisor...',
        do: (page) => page.focus('#responsavelSelButton')
    },
    {
        title: 'Enviando...',
        do: (page) => Promise.all([
            page.click('#button_ok'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ])
    },
    {
        title: 'Concluído!',
        do: () => {}
    }
]