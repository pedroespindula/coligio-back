const express = require('express');
const router = express.Router();
const controller = require('../controllers/matricula.controller.js');
const auth = require('../middlewares/auth')

router.post(
  '/:id/matricula',
  auth.verificarToken,
  auth.verificaPermissoes(["aluno"]),
  controller.matricular
);

router.delete(
  '/:id/matricula',
  auth.verificarToken,
  auth.verificaPermissoes(["aluno"]),
  controller.desmatricular
);

module.exports = router;
