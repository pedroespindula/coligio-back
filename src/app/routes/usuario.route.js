const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');
const auth = require('../middlewares/auth');

router.post('/',  controller.post);
router.get('/',  auth.verificarToken, controller.get);
router.get('/:id',  auth.verificarToken, controller.getById);
router.put('/:id',  auth.verificarToken, controller.put);
router.delete('/:id',  auth.verificarToken, controller.deleteById);
router.post('/login', controller.login)

module.exports = router;
