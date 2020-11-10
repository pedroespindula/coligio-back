exports.post = (req, res, next) => {
    res.status = 201;
    res.send('Atividade - Rota POST!');
};
  
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status = 201;
    res.send(`Atividade - Rota PUT com ID! --> ${id}`);
};
  
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status = 200;
    res.send(`Atividade - Rota DELETE com ID! --> ${id}`);
};
  
exports.get = (req, res, next) => {
    res.status = 200;
    res.send('Atividade - Rota GET!');
};
  
exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status = 200;
    res.send(`Atividade - Rota GET com ID! ${id}`);
};