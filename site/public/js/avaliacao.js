var voto = "";
function gostei(){
    voto = "sim"
}
function naoGostei(){
    voto = "não"
}
function cadastrar(){
    var descricao = input_descricao.value;
    var idPerfil = sessionStorage.ID_USUARIO;

      fetch(`/avaliacao/cadastrar/${idPerfil}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricaoServer: descricao,
            votoServer: voto,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log("Avaliação cadastrada com sucesso!")
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false
}