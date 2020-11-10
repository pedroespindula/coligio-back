const atividadeController = require('../controllers/atividadeController');

module.exports = (app) => {
   app.post('/atividade', atividadeController.post);
   app.put('/atividade/:id', atividadeController.put);
   app.delete('/atividade/:id', atividadeController.delete);
   app.get('/atividades', atividadeController.get);
   app.get('/atividade/:id', atividadeController.getById);
}