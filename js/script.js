let nameUser;
let preencheuPrimeirasMensagens = false;
cadastrarName();

function cadastrarName() {
    nameUser = { name: prompt('Nome de Usuário?') };
    console.log(nameUser);
    let requisicaoNome = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nameUser);
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
setInterval(manterConexao, 5 * 1000);
setInterval(buscarMensagens, 3 * 1000);

function buscarMensagens() {
    let requisicaoMensagens = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    if (!preencheuPrimeirasMensagens) {
        requisicaoMensagens.then(processarMensagens);
    } else {
        requisicaoMensagens.then(atualizarMensagens);
    }
    requisicaoMensagens.catch(tratarErro);
}

function processarMensagens(mensagens) {
    if (!preencheuPrimeirasMensagens) {
        let primeirasMensagens = mensagens.data;
    } else {
        primeirasMensagens = mensagens;
    }
    let chat = document.querySelector('main');
    preencheuPrimeirasMensagens = true;
    for (let index = 0; index < mensagens.data.length; index++) {
        let from = mensagens.data[index].from;
        let to = mensagens.data[index].to;
        let text = mensagens.data[index].text;
        let type = mensagens.data[index].type;
        let time = mensagens.data[index].time;
        chat.innerHTML += `
        <div class="${type}">
            <p>(${time})</p>
            <span><b>${from}</b> para <b>${to}</b>:</span>
            <p>${text}</p>
        </div>
        `;
    }
    let element = document.querySelector('main div:last-child');
    element.scrollIntoView();
}

function atualizarMensagens(mensagensNovas) {
    let difference = mensagensNovas.data.filter(x => !primeirasMensagens.includes(x));
    if (difference != []) {
        processarMensagens(difference);
    }
}


function enviarMensagem() {
    let mensagem = { from: `${nameUser}`, to: 'Todos', text: `${message}`, type: 'message' }
    let envioMensagem = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagem);
}
