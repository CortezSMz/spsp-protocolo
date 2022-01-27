module.exports = [
    {
        title: 'Bucando funcionários do setor {{setor}}...',
        do: (page, { setor, unidade }) => page.goto(`https://www.documentos.spsempapel.sp.gov.br/siga/app/lotacao/exibir?sigla=SEDUC-${setor}/${unidade}`, { waitUntil: 'networkidle0' })
    },
    {
        title: 'Salvando nomes e matrículas...',
        do: async (page) => {
            const funcionarios = await page.$$eval('body > div:nth-child(6) > table:nth-child(7) > tbody > tr', rows => {
                return Array.from(rows, row => {
                    let columns = row.querySelectorAll('td')
                    return Array.from(columns, column => column.innerText).slice(0, 2);
                });
            });

            return { funcionarios }
        }
    }
]