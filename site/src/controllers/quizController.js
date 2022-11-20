var quizModel = require("../models/quizModel")

function listar(req, res) {
    quizModel.listar().then(function (resultado) {
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

function listarTentativa(req, res) {
    var idPerfil = req.params.idPerfil;

    quizModel.listarTentativa(idPerfil).then(function (resultado) {
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

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var qtd_certas = req.body.qtd_certas;
    var qtd_erradas = req.body.qtd_erradas;
    var idPerfil = req.params.idPerfil;

    // Faça as validações dos valores
    if (qtd_certas == undefined) {
        res.status(400).send("respostas certas está undefined!");
    } else if (qtd_erradas == undefined) {
        res.status(400).send("respostas erradas está undefined!");
    } else if (idPerfil == undefined) {
        res.status(400).send("Você não está logado");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        quizModel.cadastrar(qtd_certas, qtd_erradas, idPerfil)
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
    listar,
    cadastrar,
    listarTentativa
}