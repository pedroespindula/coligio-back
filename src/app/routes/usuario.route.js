const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');

router.post('/',  controller.post);
router.get('/',  controller.get);
router.get('/:id',  controller.getById);
router.put('/:id',  controller.put);
router.delete('/:id',  controller.deleteById);
router.post('/login', controller.login)

module.exports = router;
