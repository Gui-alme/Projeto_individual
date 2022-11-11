function cadastrar(){
    if(validarCampos()){
        alert("cadastro realizado com sucesso");
        confirmarCadastro();
        window.location = "./login.html";
    }
}

var validarNome = false;
var validarUsername = false;
var validarSenha = false;
function validarCampos(){
    var nome = input_nome.value;
    var username = input_username.value;
    var senha = input_senha.value;

    if(nome.length >= 3){
        validarNome = true;
    }else{
        validarUsername = false;
        alert("nome deve conter 3 letras ou mais");
    }

    if(username.length >= 3){
        validarUsername = true;
    }else{
        validarUsername = false;
        alert("username deve conter 3 letras ou mais");
    }

    if(senha.indexOf("@") > -1 && senha.length >= 3){
        validarSenha = true;
    }else{
        validarSenha = false;
        alert("Senha deve conter mais de 3 caracteres e pelo menos 1 @")
    }

    if(validarNome && validarUsername && validarSenha){
        return true;
    }
}


function confirmarCadastro(){
    var nome = input_nome.value;
    var username = input_username.value;
    var senha = input_senha.value;

      // Enviando o valor da nova input
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            usernameServer: username,
            senhaServer: senha,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            cardErro.style.display = "block";

            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")
            
            // limparFormulario();
            // finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false
}