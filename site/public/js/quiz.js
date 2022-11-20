var contadorQuiz = 0;

function atualizarQuiz() {
    if(contadorQuiz == 5){
        relatorio();
    }else{
        fetch("/quiz/listar").then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
    
                    var containerQuiz = document.getElementById("containerQuiz")
                    for (let i = 0; i <= contadorQuiz; i++) {
                        containerQuiz.innerHTML = "";
                        var publicacao = resposta[i];
    
                        var titulo = document.createElement("h1")
                        var spanTitulo = document.createElement("span")
                        var pergunta = document.createElement("p");
                        var spanLetraA = document.createElement("span");
                        var spanLetraB = document.createElement("span");
                        var spanLetraC = document.createElement("span");
                        var spanLetraD = document.createElement("span");
    
                        var resposta1 = document.createElement("p");
                        var resposta2 = document.createElement("p");
                        var resposta3 = document.createElement("p");
                        var resposta4 = document.createElement("p");
    
                        var respostaQuiz1 = document.createElement("div");
                        var respostaQuiz2 = document.createElement("div");
                        var respostaQuiz3 = document.createElement("div");
                        var respostaQuiz4 = document.createElement("div");
    
                        titulo.className = "titleQuiz";
                        titulo.innerHTML = "QUIZ";
                        spanTitulo.className = "titleQuizRiven";
                        spanTitulo.innerHTML = "  RIVEN"
    
                        pergunta.className = "perguntaQuiz"
                        pergunta.innerHTML = `${publicacao.idPergunta}. ${publicacao.descricao}`;
    
                        spanLetraA.className = "letra";
                        spanLetraA.innerHTML = "A.";
                        spanLetraB.className = "letra";
                        spanLetraB.innerHTML = "B.";
                        spanLetraC.className = "letra";
                        spanLetraC.innerHTML = "C.";
                        spanLetraD.className = "letra";
                        spanLetraD.innerHTML = "D.";
    
                        resposta1.innerHTML = publicacao.resposta1;
                        resposta2.innerHTML = publicacao.resposta2;
                        resposta3.innerHTML = publicacao.resposta3;
                        resposta4.innerHTML = publicacao.resposta4;
    
                        respostaQuiz1.className = "respostasQuiz";
                        respostaQuiz1.setAttribute("onclick", "atualizarQuiz(), respostaErrada()");
                        respostaQuiz2.className = "respostasQuiz";
                        respostaQuiz2.setAttribute("onclick", "atualizarQuiz(), respostaErrada()");
                        respostaQuiz3.className = "respostasQuiz";
                        respostaQuiz3.setAttribute("onclick", "atualizarQuiz(), respostaErrada()");
                        respostaQuiz4.className = "respostasQuiz";
                        respostaQuiz4.setAttribute("onclick", "atualizarQuiz(), respostaErrada()");
    
    
                        respostaQuiz1.appendChild(spanLetraA);
                        respostaQuiz1.appendChild(resposta1);
                        respostaQuiz2.appendChild(spanLetraB);
                        respostaQuiz2.appendChild(resposta2);
                        respostaQuiz3.appendChild(spanLetraC);
                        respostaQuiz3.appendChild(resposta3);
                        respostaQuiz4.appendChild(spanLetraD);
                        respostaQuiz4.appendChild(resposta4);
                        titulo.appendChild(spanTitulo);
                        containerQuiz.appendChild(titulo);
                        containerQuiz.appendChild(pergunta);
                        containerQuiz.appendChild(respostaQuiz1);
                        containerQuiz.appendChild(respostaQuiz2);
                        containerQuiz.appendChild(respostaQuiz3);
                        containerQuiz.appendChild(respostaQuiz4);
    
                        // IF para adicionar o id na resposta certa
                        if (contadorQuiz == 0) {
                            respostaQuiz1.setAttribute("onclick", "respostaCerta(), atualizarQuiz()")
                        } else if (contadorQuiz == 1) {
                            respostaQuiz3.setAttribute("onclick", "respostaCerta(), atualizarQuiz()")
                        } else if (contadorQuiz == 2) {
                            respostaQuiz4.setAttribute("onclick", "respostaCerta(), atualizarQuiz()")
                        } else if (contadorQuiz == 3) {
                            respostaQuiz2.setAttribute("onclick", "respostaCerta(), atualizarQuiz()")
                        } else if (contadorQuiz == 4) {
                            respostaQuiz1.setAttribute("onclick", "respostaCerta(), atualizarQuiz()")
                        } 
                    }
                    contadorQuiz += 1;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });
    }
}


var certas = 0;
var erradas = 0;

function respostaCerta() {
    certas += 1;
}

function respostaErrada() {
    erradas += 1;
}

function relatorio() {
    var container = document.getElementById("containerQuiz");
    container.innerHTML = "";
    var titulo = document.createElement("h1");
    var titulo_certas = document.createElement("span");
    var qtd_certas = document.createElement("span");
    var titulo_erradas = document.createElement("span");
    var qtd_erradas = document.createElement("span");
    var div_buttons = document.createElement("div")
    var jogarDnv = document.createElement("button");
    var verRelatorio = document.createElement("button")

    titulo.className = "titleQuiz";
    titulo_certas.className = "respostasRelatorio";
    titulo_erradas.className = "respostasRelatorio";
    div_buttons.className = "div_buttons";
    jogarDnv.className = "btn_relatorio";
    verRelatorio.className = "btn_relatorio";


    qtd_certas.id = "span_qtd_certas";
    qtd_certas.className = "respostasRelatorio";
    qtd_erradas.id = "span_qtd_erradas";
    qtd_erradas.className = "respostasRelatorio";

    titulo.innerHTML = "RELATÓRIO DA TENTATIVA"
    titulo_certas.innerHTML = "RESPOSTAS CERTAS:"
    qtd_certas.innerHTML = certas;
    titulo_erradas.innerHTML = "RESPOSTAS ERRADAS:";
    qtd_erradas.innerHTML = erradas;
    jogarDnv.innerHTML = "Jogar novamente";
    verRelatorio.innerHTML = "Ver tentativas anteriores";

    div_buttons.appendChild(jogarDnv);
    div_buttons.appendChild(verRelatorio);

    container.appendChild(titulo);
    container.appendChild(titulo_certas);
    container.appendChild(qtd_certas);
    container.appendChild(titulo_erradas);
    container.appendChild(qtd_erradas);
    container.appendChild(div_buttons);

    computarTentativa();
}
function computarTentativa(){
    var idPerfil = sessionStorage.ID_USUARIO;
    var qtd_certas = certas;
    var qtd_erradas = erradas;

      fetch(`/quiz/cadastrar/${idPerfil}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            qtd_certas,
            qtd_erradas,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log("tentativa cadastrada");
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false
}