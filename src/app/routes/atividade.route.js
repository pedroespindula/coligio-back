const express = require('express');
const router = express.Router();
const controller = require('../controllers/atividade.controller.js');

router.post('/',  controller.post);
router.get('/',  controller.get);
router.get('/:id',  controller.getById);
router.put('/:id',  controller.put);
router.delete('/:id',  controller.deleteById);

module.exports = router;