const userRoute = require('./userRoute');
const disciplinaRoute = require('./disciplinaRoute');
const atividadeRoute = require('./atividadeRoute');

module.exports = (app) => {
    userRoute(app);
    disciplinaRoute(app);
    atividadeRoute(app);
}