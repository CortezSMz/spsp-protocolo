module.exports = [
    {
        title: 'Indo para a página de login...',
        do: (page) => page.goto('https://www.documentos.spsempapel.sp.gov.br/siga/public/app/login', { waitUntil: 'networkidle0' })
    },
    {
        title: 'Preenchendo login...',
        do: (page, { username }) => page.type('#username', username)
    },
    {
        title: 'Preenchendo senha...',
        do: (page, { password }) => page.type('#password', password)
    },
    {
        title: 'Clicando no botão entrar...',
        do: (page) => Promise.all([
            page.click('#formLogin > div.row.pt-3 > div > div > button'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
          ])
    },
    {
        title: 'Verificando...',
        do: async (page) => {
            const error = await page.$('body > div.container.content.pt-2 > div > div > div > div.login-invalido')

            if (!error) return true

            const message = await page.evaluate(el => el.innerText, error)

            return message.replace('ou clique Esqueci minha senha', 'ou altere sua senha no site.')
        }
    }
]
