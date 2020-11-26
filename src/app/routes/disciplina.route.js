const express = require('express');
const router = express.Router();
const controller = require('../controllers/disciplina.controller.js');

//Alterar rota post
router.post('/:idProf',  controller.post);
router.get('/',  controller.get);
router.get('/:id',  controller.getById);
router.delete('/:id',  controller.deleteById);

module.exports = router;