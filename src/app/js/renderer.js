const entrar = document.getElementById('entrar')
if (entrar) entrar.onclick = () => {
    let username = document.getElementById('username')
    let password = document.getElementById('password')

    if (!username.value || !password.value) {
        document.getElementById('aviso').innerText = `Preencha o campo ${!username.value ? 'Usuário' : 'Senha'} para continuar.`
        document.getElementById('aviso-div').hidden = false
        return
    } else document.getElementById('aviso-div').hidden = true

    window.api.entrar(username.value, password.value)
}

const cadastrar = document.getElementById('enviar')
if (cadastrar) cadastrar.onclick = () => {
    const assunto = document.getElementById('assunto')
    const interessado = document.getElementById('interessado')
    const supervisor = document.getElementById('supervisor')
    const arquivo = document.getElementById('arquivo')
    const loading = document.getElementById('loading')
    let enviar = document.getElementById('enviar')

    if (!assunto.value || !interessado.value || !arquivo.value || supervisor.value === 'selecione') {
        document.getElementById('aviso').innerText = `Preencha o campo ${!assunto.value ? 'Assunto' : !interessado.value ? 'Interessado' : supervisor.value === 'selecione' ? 'Supervisor' : 'Arquivo'} para continuar.`
        document.getElementById('aviso-div').hidden = false
        return
    } else document.getElementById('aviso-div').hidden = true

    for (const el of [assunto, interessado, supervisor, arquivo, enviar]) el.disabled = true
    loading.hidden = false

    window.api.cadastrar(assunto.value, interessado.value, supervisor.value, arquivo.files[0].path)
}

const protocolar = document.getElementById('protocolar')
if (protocolar) protocolar.onclick = () => {
    const processo = document.getElementById('processo')
    window.api.protocolar(processo.innerText)
}