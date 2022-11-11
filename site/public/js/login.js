function entrar(){
    if(validarCampos()){
        confirmarLogin();
    }
}

var validarUsername = false;
var validarSenha = false;
function validarCampos(){
    var username = input_username.value;
    var senha = input_senha.value;

    if(username.length >= 3){
        validarUsername = true;
    }else{
        validarUsername = false;
        alert("Username deve conter 3 letras ou mais")
    }

    if(senha.indexOf("@") > -1 && senha.length >= 3){
        validarSenha = true;
    }else{
        validarSenha = false;
        alert("Senha deve conter 3 caracteres ou mais e pelo menos 1 @")
    }
    if(validarUsername && validarSenha){
        return true;
    }
}

function confirmarLogin(){
    
    var usernameVar = input_username.value;
    var senhaVar = input_senha.value;

    console.log("FORM LOGIN: ", usernameVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usernameServer: usernameVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idPerfil;

                setTimeout(function () {
                    window.location = "../quiz/quiz.html";
                }, 0); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
