const express = require('express');
const router = express.Router();
const controller = require('../controllers/atividade.controller.js');

router.post('/:idDisc/atividade',  controller.post);
router.get('/:idDisc/atividade',  controller.get);
router.get('/:idDisc/atividade/:id',  controller.getById);
router.put('/:idDisc/atividade/:id',  controller.put);
router.delete('/:idDisc/atividade/:id',  controller.deleteById);

module.exports = router;