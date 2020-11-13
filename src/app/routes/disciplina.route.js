const express = require('express');
const router = express.Router();
const controller = require('../controllers/disciplina.controller.js');

router.post('/',  controller.post);
router.get('/',  controller.get);
router.get('/:id',  controller.getById);
router.delete('/:id',  controller.deleteById);

module.exports = router;