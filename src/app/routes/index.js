const express = require('express');

const router = express.Router();

const usuario = require('./usuario.route');

router.get('/', (_, res) => res.send('API :)'));

router.use('/usuario', usuario);

module.exports = router;
