const myModal = new bootstrap.Modal("#register-modal");

let logged = sessionStorage.getItem("logged");

const session =localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Ops, Verifique o usuario ou a senha.");
        return;
    }

    if (account) {
        if (account.password !== password) {
            alert("Ops, Verifique o usuario ou a senha.");
            return;
        }
        if (checksession) {
            localStorage.setItem("currentAccount", email);
        }
    
        saveSession (email, checksession);
    }
    window.location.href = "home.html";

})
//CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

const email = document.getElementById("email-create-input").value;
const password = document.getElementById("password-create-input").value;

if (email === "" || password === "") {
    alert("Preencha todos os campos");
    return;
}

if (email.length < 10) {
    alert("Preencha o campo com um e-mail valido.");
    return;
}

if (password.length < 6) {
    alert("A senha precisa ter no minimo 6 caracteres.");
    return;
}

saveAccount ({
    login: email,
    password: password,
    transactions: []
})

myModal.hide();
alert("Conta criada com sucesso!");

})

//VERIFICAR SE A PESSOA ESTA LOGADA NO SISTEMA
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

// FUNÇÃO PARA SALVAR A CONTA NO LOCAL STORAGE
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

// FUNÇÃO PARA PEGAR A CONTA NO LOCAL STORAGE
function getAccount(key) {
    const account = localStorage.getItem(key);
    if (account) {
        return JSON.parse(account);
    }
    return "";
}

// FUNÇÃO PARA SALVAR A CONTA NO LOCAL STORAGE E NO SESSIONSTORAGE
function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}