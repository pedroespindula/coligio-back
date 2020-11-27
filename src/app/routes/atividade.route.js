const express = require('express');
const router = express.Router();
const controller = require('../controllers/atividade.controller.js');
const auth = require('../middlewares/auth')

router.post(
  '/:idDisc/atividade',  
  auth.verificarToken,
  auth.verificaPermissoes(["professor"]),
  controller.post
);
router.get(
  '/:idDisc/atividade',
  auth.verificarToken,
  controller.get
);
router.get(
  '/:idDisc/atividade/:id',
  auth.verificarToken,
  controller.getById
);
router.delete(
  '/:idDisc/atividade/:id',
  auth.verificarToken,
  auth.verificaPermissoes(["professor"]),
  controller.deleteById
);

module.exports = router;
