exports.post = (req, res, next) => {
    res.status = 201;
    res.send('Usuario - Rota POST!');
};
  
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status = 201;
    res.send(`Usuario - Rota PUT com ID! --> ${id}`);
};
  
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status = 200;
    res.send(`Usuario - Rota DELETE com ID! --> ${id}`);
};
  
exports.get = (req, res, next) => {
    res.status = 200;
    res.send('Usuario - Rota GET!');
};
  
exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status = 200;
    res.send(`Usuario - Rota GET com ID! ${id}`);
};