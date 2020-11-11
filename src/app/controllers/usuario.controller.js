const service = require('../services/usuario.service');

exports.post = async (req, res) => {
  try {
    const novoUsuario = await service.create(req.body);

    if (!novoUsuario) return res.status(400).json({ error: 'Usuário já existe' });

    return res.status(201).json(novoUsuario);
  } catch (e) {
    const errorMsg = 'Erro ao cadastrar usuário. ';

    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }

};

exports.put = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dadosUsuario = { ...req.body, updatedAt: new Date() };

    const usuarioAtualizado = await service.edit(id, dadosUsuario);

    if (!usuarioAtualizado) res.status(404).json({ error: 'Usuário não encontrado' });

    return res.status(200).json(usuarioAtualizado);
  } catch (e) {
    const errorMsg = 'Erro ao editar usuário';

    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const usuario = await service.deleteById(id);

    if (!usuario) res.status(404).json({ error: 'Usuário não encontrado' });

    return res.status(200).json(usuario);
  } catch (e) {
    const errorMsg = 'Erro ao buscar usuário por id';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};
  
exports.get = async (req, res, next) => {
  try {
    
    const usuarios = await service.get();

    return res.status(200).json(usuarios);
  } catch (e) {
    const errorMsg = 'Erro ao buscar usuários';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};
  
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const usuario = await service.getById(id);

    if (!usuario) res.status(404).json({ error: 'Usuário não encontrado' });

    return res.status(200).json(usuario);
  } catch (e) {
    const errorMsg = 'Erro ao buscar usuário por id';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};
