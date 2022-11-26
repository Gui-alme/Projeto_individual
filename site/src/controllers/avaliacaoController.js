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


function chamarAvaliacao(req, res) {
    var idPerfil = req.params.idPerfil;

    avaliacaoModel.chamarAvaliacao(idPerfil).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function qtdPerfil(req, res) {
    avaliacaoModel.qtdPerfil().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function voto(req, res) {
    avaliacaoModel.voto().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizar(req, res) {
    var novaDescricao = req.body.descricao;
    var voto = req.body.voto;
    var idPerfil = req.params.idPerfil;

    avaliacaoModel.atualizar(novaDescricao, voto, idPerfil)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function listarAvaliacoes(req, res) {
    avaliacaoModel.listarAvaliacoes().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    cadastrar,
    chamarAvaliacao,
    qtdPerfil,
    voto,
    atualizar,
    listarAvaliacoes
}