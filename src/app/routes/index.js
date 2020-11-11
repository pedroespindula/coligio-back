const express = require('express');

const router = express.Router();

const usuario = require('./usuarioRoute');

router.get('/', (_, res) => res.send('API :)'));

router.use('/usuario', usuario);

module.exports = router;
