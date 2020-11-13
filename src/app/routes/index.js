const express = require('express');

const router = express.Router();

const usuario = require('./usuario.route');
const disciplina = require('./disciplina.route');

router.get('/', (_, res) => res.send('API :)'));

router.use('/usuario', usuario);
router.use('/disciplina', disciplina)

module.exports = router;
