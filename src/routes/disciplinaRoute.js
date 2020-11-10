const disciplinaController = require('../controllers/disciplinaController');

module.exports = (app) => {
   app.post('/disciplina', disciplinaController.post);
   app.put('/disciplina/:id', disciplinaController.put);
   app.delete('/disciplina/:id', disciplinaController.delete);
   app.get('/disciplinas', disciplinaController.get);
   app.get('/disciplina/:id', disciplinaController.getById);
}