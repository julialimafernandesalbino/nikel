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

    getTransactions();

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
 
    getTransactions();
}

//FUNÇÃO PARA LOGOUT
function logout() {
//Remove um item do localStorage, 
//que é uma forma de armazenar dados no navegador de forma persistente (mesmo após fechar o navegador).
    localStorage.removeItem(session);
//O sessionStorage é parecido com o localStorage, mas os dados somem quando a aba ou navegador é fechado.
    sessionStorage.removeItem("logged");
//Essa linha redireciona o usuário para a página index.html
    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) =>{
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }
            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `;
        })
        
    };

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

//FUNÇÃO PARA PEGAR O QUE FOI ADICIONADO NO LOCALSTORAGE E MOSTRAR NA TELA
//LocalStorage só pode guardar strings, por isso precisamos converter o objeto JS para uma string antes de salvar, utilizando o JSON.stringify.
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

