function cadastrar(){
    if(validarCampos()){
        alert("cadastro realizado com sucesso");
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