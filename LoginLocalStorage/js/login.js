function logar(){
    let email = document.getElementById("email");
    let senha = document.getElementById("senha");

    //console.log(email.value + " " + senha.value);

    if (email.value == "admin@admin.com" && senha.value == "admin") {
        alert("Usuário autenticado");
        localStorage.setItem("acesso", true);

        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha inválidos");
    }
}