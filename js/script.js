let nameUser;
cadastrarName();

function cadastrarName () {
    nameUser = {name: prompt('Nome de Usuário?')};
    console.log(nameUser);
    let requisicaoNome = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants', nameUser);
    requisicaoNome.then(tratarSucesso);
    requisicaoNome.catch(tratarErro);
}

function tratarSucesso() {
    console.log('Requisicao foi bem sucedida!');
}

function tratarErro(erro) {
    let statusCode = erro.response.status;
    console.log(statusCode);
    if (statusCode == 400) {
        cadastrarName();
    }

}

function manterConexao() {
    let requisicaoConectado = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', nameUser);
    requisicaoConectado.then(tratarSucesso);
    requisicaoConectado.catch(tratarErro);
}


setInterval(manterConexao, 5*1000);