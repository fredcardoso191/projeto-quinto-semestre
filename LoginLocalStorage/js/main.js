let logado = false;

if (localStorage.getItem("acesso") == true) {
    logado = true;
    console.log("Entrou");
}

/*if (logado != true) {
    alert("Você não está autenticado");
    window.location.href = "login.html";
}*/

function sair() {
    window.location.href = "login.html";
}