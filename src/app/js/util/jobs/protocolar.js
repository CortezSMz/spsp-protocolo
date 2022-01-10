module.exports = [
    {
        title: 'Indo para a página de protocolo...',
        do: (page, { processo }) => page.goto(`https://www.documentos.spsempapel.sp.gov.br/sigaex/app/expediente/doc/gerarProtocolo?sigla=${processo}&popup=true&`, { waitUntil: 'networkidle0' })
    },
    {
        title: 'Imprimindo...',
        do: (page) => page.click('#btn-form > form > button')
    },
    {
        title: 'Concluído!',
        do: () => {}
    }
]