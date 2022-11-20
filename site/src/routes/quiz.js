var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/listar", function (req, res) {
    quizController.listar(req, res);
});

router.get("/listarTentativa/:idPerfil", function (req, res) {
    quizController.listarTentativa(req, res);
});

router.post("/cadastrar/:idPerfil", function (req, res) {
    quizController.cadastrar(req, res);
})

module.exports = router;