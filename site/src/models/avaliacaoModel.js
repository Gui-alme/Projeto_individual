var database = require("../database/config")

function cadastrar(descricao, voto, idPerfil) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", descricao, voto, idPerfil);
    
    var instrucao = `
        INSERT INTO Avaliacoes (voto, descricao, fkPerfil) VALUES
        ('${voto}', '${descricao}', ${idPerfil});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function chamarAvaliacao(idPerfil) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function chamarAvaliacao()");
    var instrucao = `
        SELECT 
            voto, 
            descricao 
        FROM avaliacoes 
            WHERE fkPerfil = ${idPerfil};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function qtdPerfil() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdPerfil()");
    var instrucao = `
        SELECT 
            COUNT(idPerfil) AS 'quantidadePerfil' 
        FROM Perfil;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function voto() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdPerfil()");
    var instrucao = `
        SELECT
            COUNT(voto) AS 'qtdVoto', 
            voto
        FROM avaliacoes
	    GROUP BY voto ORDER BY voto;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(novaDescricao, voto, idPerfil) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", novaDescricao, voto, idPerfil);
    var instrucao = `
        UPDATE avaliacoes SET voto = '${voto}', descricao = '${novaDescricao}' where fkPerfil = '${idPerfil}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrar,
    chamarAvaliacao,
    qtdPerfil,
    voto,
    atualizar
};