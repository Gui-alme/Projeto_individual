var avaliacaoModel = require("../models/avaliacaoModel");

function cadastrar(req, res) {
    var descricao = req.body.descricaoServer;
    var voto = req.body.votoServer;
    var idPerfil = req.params.idPerfil;

    if (descricao == undefined) {
        res.status(400).send("Sua descrição está undefined!");
    } else if (voto == undefined) {
        res.status(400).send("Seu voto está undefined!");
    } else if (idPerfil == undefined) {
        res.status(400).send("Você não está logado");
    } else {
        avaliacaoModel.cadastrar(descricao, voto, idPerfil)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}