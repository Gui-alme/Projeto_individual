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
                        respostaQuiz1.setAttribute("onclick", "respostaErrada(), atualizarQuiz()");
                        respostaQuiz2.className = "respostasQuiz";
                        respostaQuiz2.setAttribute("onclick", "respostaErrada(), atualizarQuiz()");
                        respostaQuiz3.className = "respostasQuiz";
                        respostaQuiz3.setAttribute("onclick", "respostaErrada(), atualizarQuiz()");
                        respostaQuiz4.className = "respostasQuiz";
                        respostaQuiz4.setAttribute("onclick", "respostaErrada(), atualizarQuiz()");
    
    
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
    contadorQuiz = 0;
    var container = document.getElementById("containerQuiz");
    container.innerHTML = "";
    var titulo = document.createElement("h1");
    var titulo_certas = document.createElement("span");
    var qtd_certas = document.createElement("span");
    var titulo_erradas = document.createElement("span");
    var qtd_erradas = document.createElement("span");
    var divElo = document.createElement("div");
    var spanElo = document.createElement("span");
    var respostaElo = document.createElement("span")
    var div_buttons = document.createElement("div")
    var jogarDnv = document.createElement("button");
    var ancora = document.createElement("a");
    var verRelatorio = document.createElement("button")

    titulo.className = "titleQuiz";
    titulo_certas.className = "respostasRelatorio";
    titulo_erradas.className = "respostasRelatorio";
    divElo.className = "elo";
    div_buttons.className = "div_buttons";
    jogarDnv.className = "btn_jogardnv";
    verRelatorio.className = "btn_relatorio";
    ancora.className = "ancoraTentativas"

    jogarDnv.setAttribute("onclick", "atualizarQuiz()")
    ancora.setAttribute("href", "#containerTentativas");

    qtd_certas.id = "span_qtd_certas";
    qtd_certas.className = "respostasRelatorio";
    qtd_erradas.id = "span_qtd_erradas";
    qtd_erradas.className = "respostasRelatorio";

    titulo.innerHTML = "RELATÓRIO DA TENTATIVA"
    titulo_certas.innerHTML = "RESPOSTAS CERTAS:"
    qtd_certas.innerHTML = certas;
    titulo_erradas.innerHTML = "RESPOSTAS ERRADAS:";
    qtd_erradas.innerHTML = erradas;
    spanElo.innerHTML = "SEU ELO É:"

    if(certas == 0){
        respostaElo.innerHTML = `<span style="color: #ffffff;">PRATA</span> - melhore um pouco`
    } else if(certas == 1){
        respostaElo.innerHTML = `<span style="color: #f7f2c8;">OURO</span> - ainda tem muito para aprender`
    } else if(certas <= 3){
        respostaElo.innerHTML = `<span style="color: #016159;">PLATINA</span> - aprendeu muito, porém melhore`
    } else if(certas == 4){
        respostaElo.innerHTML = `<span style="color: #800000;">MESTRE</span> - está quase chegando lá`
    } else if(certas == 5){
        respostaElo.innerHTML = `<span style="color: #ccac00;">CHALLANGER</span> - você está entre os melhores!!!`
    }

    jogarDnv.innerHTML = "Jogar novamente";
    verRelatorio.innerHTML = "Ver tentativas anteriores";

    div_buttons.appendChild(jogarDnv);
    ancora.appendChild(verRelatorio);
    div_buttons.appendChild(ancora);
    divElo.appendChild(spanElo);
    divElo.appendChild(respostaElo);
    container.appendChild(titulo);
    container.appendChild(titulo_certas);
    container.appendChild(qtd_certas);
    container.appendChild(titulo_erradas);
    container.appendChild(qtd_erradas);
    container.appendChild(divElo);
    container.appendChild(div_buttons);

    computarTentativa();
    certas = 0;
    erradas = 0;
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
            atualizarTentativa();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false
}

function atualizarTentativa() {
    var idPerfil = sessionStorage.ID_USUARIO;

    fetch(`/quiz/listarTentativa/${idPerfil}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var container = document.getElementById("tentativas");
                container.innerHTML = "";
                var titulo = document.createElement("h1");
                titulo.className = "titulo"
                titulo.innerHTML = "TENTATIVAS";
                container.appendChild(titulo);
                for (let i = 1; i <= resposta.length; i++) {
                    var posicao = resposta[resposta.length - i];

                    var div_container = document.createElement("div");
                    var labels = document.createElement("div");
                    var respostas = document.createElement("div");
                    var spanTentativa = document.createElement("span");
                    var spanCertas = document.createElement("span");
                    var spanErradas = document.createElement("span");
                    var spanElo = document.createElement("span");
                    var spanQtdTentativas = document.createElement("span");
                    var spanQtdCertas = document.createElement("span");
                    var spanQtdErradas = document.createElement("span");
                    var spanRespostaElo = document.createElement("span");


                    div_container.className = "div_tentativa";
                    labels.className = "labels";
                    respostas.className = "respostas";
                    spanQtdCertas.className = "green_span";
                    spanQtdErradas.className = "red_span";
                    spanQtdTentativas.className = "white_span"

                    spanTentativa.innerHTML = "Tentativa número:";
                    spanCertas.innerHTML = "Respostas certas: ";
                    spanErradas.innerHTML = "Respostas erradas: ";
                    spanElo.innerHTML = "Ranking da tentativa:";

                    spanQtdTentativas.innerHTML = (resposta.length - i) + 1;
                    spanQtdCertas.innerHTML = posicao.respostas_certas;
                    spanQtdErradas.innerHTML = posicao.respostas_erradas;
                    if(posicao.respostas_certas == 0){
                        spanRespostaElo.innerHTML =  `<span style="color: #ffffff">PRATA</span>`
                    } else if(posicao.respostas_certas == 1){
                        spanRespostaElo.innerHTML =  `<span style="color: #f7f2c8">OURO</span>`
                    } else if(posicao.respostas_certas <= 3){
                        spanRespostaElo.innerHTML =  `<span style="color: #016159">PLATINA</span>`
                    } else if(posicao.respostas_certas == 4){
                        spanRespostaElo.innerHTML =  `<span style="color: #800000">MESTRE</span>`
                    } else{
                        spanRespostaElo.innerHTML =  `<span style="color: #ccac00">CHALLANGER</span>`
                    }

                    labels.appendChild(spanTentativa);
                    labels.appendChild(spanCertas);
                    labels.appendChild(spanErradas);
                    labels.appendChild(spanElo);

                    respostas.appendChild(spanQtdTentativas);
                    respostas.appendChild(spanQtdCertas);
                    respostas.appendChild(spanQtdErradas);
                    respostas.appendChild(spanRespostaElo);

                    div_container.appendChild(labels);
                    div_container.appendChild(respostas);
                    container.appendChild(div_container);                    
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}