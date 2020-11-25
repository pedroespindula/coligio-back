const express = require('express');

const router = express.Router();

const usuario = require('./usuario.route');
const disciplina = require('./disciplina.route');
const atividade = require('./atividade.route');
const matricula = require('./matricula.route');

router.get('/', (_, res) => res.send('API :)'));

router.use('/usuario', usuario);
router.use('/disciplina', disciplina)
router.use('/atividade', atividade)
router.use('/matricula', matricula)

module.exports = router;
