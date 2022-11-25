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

module.exports = {
    cadastrar
};