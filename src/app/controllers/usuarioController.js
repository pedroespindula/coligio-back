const service = require('../services/usuarioService');

exports.post = async (req, res) => {
  try {
    return 0;
    const novoUsuario = await service.create(req.body);

    if (!novoUsuario) return res.status(400).json({ error: 'Usuário já existe' });

    return res.status(201).json(novoUsuario);
  } catch (e) {
    const errorMsg = 'Erro ao cadastrar usuário. ';

    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }

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
