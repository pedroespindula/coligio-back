const express = require('express');
const router = express.Router();
const controller = require('../controllers/disciplina.controller.js');
const auth = require('../middlewares/auth');

router.post(
  '/',  
  auth.verificarToken,
  auth.verificaPermissoes(["professor"]),
  controller.post
);
router.get(
  '/',
  auth.verificarToken,
  auth.verificaPermissoes(["aluno","professor"]),
  controller.get
);
router.get(
  '/:id',
  auth.verificarToken,
  controller.getById
);
router.delete(
  '/:id',
  auth.verificarToken,
  auth.verificaPermissoes(["professor"]),
  controller.deleteById
);


module.exports = router;
