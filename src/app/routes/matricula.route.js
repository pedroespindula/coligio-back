const express = require('express');
const router = express.Router();
const controller = require('../controllers/matricula.controller.js');

router.post('/disciplina/:idDisc/matricular/:idAluno',  controller.matriculaAluno);
router.post('/disciplina/:idDisc/desmatricular/:idAluno',  controller.desmatriculaAluno);

module.exports = router;