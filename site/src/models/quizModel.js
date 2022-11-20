var database = require("../database/config")

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT
            p.idPergunta, 
            p.descricao, 
            p.resposta1, 
            p.resposta2, 
            p.resposta3, 
            p.resposta4  
        FROM QuizPergunta p;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarTentativa(idPerfil) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarTentativa()");
    var instrucao = `
        SELECT 
            t.idTentativa,
            t.respostas_certas,
            t.respostas_erradas
        FROM Tentativa t
	    WHERE fkPerfil = ${idPerfil};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(qtd_certas, qtd_erradas, idPerfil) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", qtd_certas, qtd_erradas, idPerfil);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Tentativa (respostas_certas, respostas_erradas, fkPerfil, fkQuiz) VALUES ('${qtd_certas}', '${qtd_erradas}', '${idPerfil}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    listarTentativa
}