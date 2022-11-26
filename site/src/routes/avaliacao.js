var express = require("express");
var router = express.Router();
var avaliacaoController = require("../controllers/avaliacaoController");


router.get("/chamarAvaliacao/:idPerfil", function (req, res) {
    avaliacaoController.chamarAvaliacao(req, res);
});

router.get("/qtdPerfil", function (req, res) {
    avaliacaoController.qtdPerfil(req, res);
});

router.get("/voto", function (req, res) {
    avaliacaoController.voto(req, res);
});

router.put("/atualizar/:idPerfil", function (req, res) {
    avaliacaoController.atualizar(req, res);
});

router.post("/cadastrar/:idPerfil", function (req, res) {
    avaliacaoController.cadastrar(req, res);
})


module.exports = router;