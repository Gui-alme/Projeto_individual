var voto = "";

function gostei() {
    voto = "sim"
}

function naoGostei() {
    voto = "não"
}

function cadastrar() {
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
            window.location = "../quiz/avaliacao.html"
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false
}

function clique1() {
    var botao = document.getElementById("btnLike")
    botao.className = "btnAcionado1";
    var botaoAnterior = document.getElementById("btnDislike");
    botaoAnterior.className = "btnVotacaoDislike";
}

function clique2() {
    var botao = document.getElementById("btnDislike")
    botao.className = "btnAcionado2"
    var botaoAnterior = document.getElementById("btnLike");
    botaoAnterior.className = "btnVotacaoLike";
}

var update = false;
function fazerUpdate(){
    update = true;
    fazerAvaliacao();
}

function atualizar() {
    var idPerfil = sessionStorage.ID_USUARIO;
    fetch(`/avaliacao/atualizar/${idPerfil}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            voto: voto,
            descricao: input_descricao.value
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            window.location = "../quiz/avaliacao.html"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function fazerAvaliacao(){
    var container = document.getElementById("avaliacaoUser");
    container.innerHTML = "";

    var titulo = document.createElement("h1");
    titulo.innerHTML = "Deixe sua Avaliação";

    var divAvaliar = document.createElement("div");
    divAvaliar.className = "fazerAvaliacao";
    divAvaliar.id = "divAvaliacao";

    var divBtns = document.createElement("div")
    divBtns.className = "btnsVotacao";
    
    var buttonLike = document.createElement("button");
    buttonLike.className = "btnVotacaoLike";
    buttonLike.id = "btnLike";
    buttonLike.innerHTML = "Like"
    buttonLike.setAttribute("onclick", "gostei(), clique1()");
    var buttonDislike = document.createElement("button");
    buttonDislike.className = "btnVotacaoDislike";
    buttonDislike.id = "btnDislike";
    buttonDislike.innerHTML = "Dislike";
    buttonDislike.setAttribute("onclick", "naoGostei(), clique2()");

    var divDescricao = document.createElement("div");
    divDescricao.className = "descricao";

    var spanDescricao = document.createElement("span");
    spanDescricao.className = "titulo-descricao";
    spanDescricao.innerHTML = "Descrição:"

    var textArea = document.createElement("textArea");
    textArea.id = "input_descricao";
    textArea.className = "txtArea";
    textArea.setAttribute("rows", "10");

    var buttonEnviar = document.createElement("button");
    buttonEnviar.className = "btnVotacaoEnviar";
    buttonEnviar.innerHTML = "Enviar"

    if(update == false){
        buttonEnviar.setAttribute("onclick", "cadastrar()");
    } else{
        buttonEnviar.setAttribute("onclick", "atualizar()");
    }

    divDescricao.appendChild(spanDescricao);
    divDescricao.appendChild(textArea);
    divBtns.appendChild(buttonLike);
    divBtns.appendChild(buttonDislike);
    divAvaliar.appendChild(divBtns);
    divAvaliar.appendChild(divDescricao);
    divAvaliar.appendChild(buttonEnviar);
    container.appendChild(titulo);
    container.appendChild(divAvaliar);
}
function chamarAvaliacao() {
    var idPerfil = sessionStorage.ID_USUARIO;

    fetch(`/avaliacao/chamarAvaliacao/${idPerfil}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                if (resposta.length > 0) {
                    var container = document.getElementById("avaliacaoUser");
                    container.innerHTML = "";
                    var votoAvaliacao = "";
                    if (resposta[0].voto == "sim") {
                        votoAvaliacao = "LIKE";
                    } else {
                        votoAvaliacao = "DISLIKE"
                    }

                    var descricaoAvaliacao = resposta[0].descricao;

                    var titulo = document.createElement("h1");
                    var divResultado = document.createElement("div")
                    var btnEditar = document.createElement("button");

                    var divVoto = document.createElement("div");
                    var divDescricao = document.createElement("div");
                    var pVoto = document.createElement("p");
                    var pDescricao = document.createElement("p");

                    titulo.innerHTML = "Sua Avaliação";
                    pVoto.innerHTML = votoAvaliacao;
                    pDescricao.innerHTML = descricaoAvaliacao;
                    btnEditar.innerHTML = "Editar";

                    pVoto.className = "pVoto";
                    divResultado.className = "avaliacaoResultado";
                    if (votoAvaliacao == "LIKE") {
                        divVoto.className = "votacao";
                    } else {
                        divVoto.className = "votacao2";
                    }
                    divDescricao.className = "descricaoVoto";
                    pDescricao.className = "descricaoTxt";
                    btnEditar.className = "btnEditar";

                    btnEditar.setAttribute("onclick", "fazerUpdate()");

                    divVoto.appendChild(pVoto);
                    divDescricao.appendChild(pDescricao);
                    divResultado.appendChild(divVoto);
                    divResultado.appendChild(divDescricao);
                    container.appendChild(titulo);
                    container.appendChild(divResultado);
                    container.appendChild(btnEditar);
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        fazerAvaliacao();
        console.error(resposta);
    });
}

// Funções da parte do gráfico
function qtdPerfil() {
    fetch("/avaliacao/qtdPerfil").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var span = document.getElementById("qtdPerfilCadastrado");
                span.innerHTML = resposta[0].quantidadePerfil;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
var qtdLike = 0;
var qtdDislike = 0;
function obterDadosGrafico() {
    console.log("chamando função obter dados gráfico");
    fetch(`/avaliacao/voto`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                qtdDislike = resposta[0].qtdVoto;
                qtdLike = resposta[1].qtdVoto;
                criarGrafico();
            });

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function criarGrafico(){
    var container = document.getElementById("grafico");
    container.innerHTML = "";
    
    var canvas = document.createElement("canvas");
    canvas.id = "graficoVotacaoQtd"
    container.appendChild(canvas)
    const votacao = {
        labels: [
            'Quantidade de Likes',
            'Quantidade de Dislikes'
        ],
        datasets: [{
            label: 'Votos',
            data: [qtdLike, qtdDislike],
            backgroundColor: [
                'rgb(93, 208, 67)',
                'rgb(246, 69, 69)',
            ],
            hoverOffset: 4
        }]
    };
    
    const config = {
        type: 'pie',
        data: votacao,
    };
    
    const graficoVotacao = new Chart(
        document.getElementById('graficoVotacaoQtd'),
        config
    );
}

function listarAvaliacoes(){
    fetch(`/avaliacao/listarAvaliacoes/`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));    
                
                var container = document.getElementById("avaliacoes");
                container.innerHTML = "";
                var titulo = document.createElement("h1");
                titulo.innerHTML = "Outras Avaliações";
                container.appendChild(titulo);
                for(var i = 0; i < resposta.length; i++){
                    var nome = resposta[i].nome;
                    var voto = resposta[i].voto;
                    var descricao = resposta[i].descricao;
                    
                    var avaliacaoResultado = document.createElement("div");
                    avaliacaoResultado.className = "avaliacoesResultado";

                    var divVotacao = document.createElement("div");

                    var divDescricao = document.createElement("div");
                    divDescricao.className = "descricaoVoto2";

                    var p = document.createElement("p");
                    p.className = "pVoto";
                    if(voto == "sim"){
                        p.innerHTML = "LIKE";
                        divVotacao.className = "votacao";
                    }else{
                        p.innerHTML = "DISLIKE";
                        divVotacao.className = "votacao2";
                    }

                    var pDescNome = document.createElement("p");
                    pDescNome.className = "descricaoTxt";
                    pDescNome.innerHTML = "Nome: ";

                    var pDesc = document.createElement("p");
                    pDesc.className = "descricaoTxt";
                    pDesc.innerHTML = descricao;

                    var spanNome = document.createElement("span");
                    spanNome.innerHTML = nome;

                    pDescNome.appendChild(spanNome);
                    divVotacao.appendChild(p);
                    divDescricao.appendChild(pDescNome);
                    divDescricao.appendChild(pDesc);
                    avaliacaoResultado.appendChild(divVotacao);
                    avaliacaoResultado.appendChild(divDescricao);
                    container.appendChild(avaliacaoResultado);
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function divSair(){
    
}