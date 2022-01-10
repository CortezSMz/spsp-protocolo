const { join } = require('path')
require('dotenv').config()

module.exports = {
    packagerConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
        config: {
          description: 'Automatização de protocolo do SP Sem Papel',
          iconUrl: 'https://www.documentos.spsempapel.sp.gov.br/siga/imagens/sem-papel.ico',
          setupIcon: join(__dirname, './img/sem-papel.ico'),
          icon: join(__dirname, './img/sem-papel.ico')
        }
      }
    ],
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          authToken: process.env.GITHUB_TOKEN,
          repository: {
            owner: 'cortezsmz',
            name: 'spsp-protocolo'
          },
          prerelease: true
        }
      }
    ]
  }