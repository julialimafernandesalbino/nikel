const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session =localStorage.getItem("session");
let data = {
// arrays (listas) = [].
    transactions:[]
};

//Essa parte procura no HTML por um elemento que tenha o atributo id="button-logout"
//"click" é o tipo de evento: ou seja, quando o botão for clicado.
//logout é o nome da função que será executada quando o botão for clicado.
document.getElementById("button-logout").addEventListener("click", logout);

//Essa parte procura no HTML por um elemento que tenha o atributo id="transaction-button"
document.getElementById("transactions-button").addEventListener("click", function() {
    window.location.href = "transactions.html";
});

//ADICIONAR LANÇAMENTO 
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
//document.getElementById("value-input") - Seleciona o elemento do HTML que tem o id "value-input".
//.value - Pega o valor digitado dentro desse elemento.
//parseFloat(...) - Função que converte uma string para um número decimal, que tenha vírgula.
//const value = Atribui o resultado da conversão à constante chamada value.
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
// document.querySelector() - é um jeito do JavaScript buscar um elemento na página usando um "endereço" (seletor CSS).
//:checked - é um filtro que seleciona somente aquele <input> que está marcado (selecionado), ou seja, aquele que o usuário escolheu.
//.value - Depois que o input selecionado é encontrado, pegamos o valor que ele tem, que vem do atributo value do input. 
    const type = document.querySelector('input[name="type-input"]:checked').value;

//data.transactions - é um array (lista) que contém várias transações.
//unshift - Adiciona um item no inicio do array (lista).
    data.transactions.unshift({
        value: value,
        description: description,
        date: date,
        type: type
    });

    saveData(data);
//.target.reset() - Limpa o formulário
    e.target.reset();
//.hide() - Esconde o modal.
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();
    alert("Lançamento adicionado com sucesso!");
});


checkLogged();

//VERIFICAR SE A PESSOA ESTA LOGADA NO SISTEMA
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

//Está buscando um item do localStorage com a chave armazenada na variável logged.
    const dataUser = localStorage.getItem(logged);
//Verifica se encontrou algo no localStorage. 
//Se sim, transforma a string JSON em objeto JS usando JSON.parse.
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
}

//DESLOGAR DA PAGINA DO NIKEL NO ICONE SAIR
function logout() {
//Remove um item do localStorage, 
//que é uma forma de armazenar dados no navegador de forma persistente (mesmo após fechar o navegador).
    localStorage.removeItem(session);
//O sessionStorage é parecido com o localStorage, mas os dados somem quando a aba ou navegador é fechado.
    sessionStorage.removeItem("logged");
//Essa linha redireciona o usuário para a página index.html
    window.location.href = "index.html";
}

//FUNÇÃO PARA PEGAR OS LANÇAMENTOS DO USUARIO NO LOCAL STORAGE
function getCashIn() {
    const transactions = data.transactions;
//cashIn agora é uma lista contendo apenas os lançamentos de entrada.
    const cashIn = transactions.filter(item => item.type === "1");
//Verifica se o array cashIn tem algum item. Se tiver pelo menos 1 entrada, o código dentro do if será executado.    
    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;
//Se houver mais de 5 entradas, mostra só as 5 primeiras. Se tiver 5 ou menos, mostra todas.
        if (cashIn.length > 5) { 
        limit = 5;
        }
        else {
        limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p> ${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }

}
//FUNÇÃO PARA SAIDA DE DINHEIRO.
function getCashOut() {
    const transactions = data.transactions;
//cashIn agora é uma lista contendo apenas os lançamentos de saída.
    const cashOut = transactions.filter(item => item.type === "2");
//Verifica se o array cashIn tem algum item. Se tiver pelo menos 1 entrada, o código dentro do if será executado.    
    if (cashOut.length) {
        let cashOutHtml = ``;
        let limit = 0;
//Se houver mais de 5 entradas, mostra só as 5 primeiras. Se tiver 5 ou menos, mostra todas.
        if (cashOut.length > 5) { 
        limit = 5;
        }
        else {
        limit = cashOut.length;
        }

        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p> ${cashOut[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashOut[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }

}

function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        }else{
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}


//LocalStorage só pode guardar strings, por isso precisamos converter o objeto JS para uma string antes de salvar, utilizando o JSON.stringify.
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

