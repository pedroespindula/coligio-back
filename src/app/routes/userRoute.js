const userController = require('../controllers/userController');

module.exports = (app) => {
   app.post('/usuario', userController.post);
   app.put('/usuario/:id', userController.put);
   app.delete('/usuario/:id', userController.delete);
   app.get('/usuarios', userController.get);
   app.get('/usuario/:id', userController.getById);
}