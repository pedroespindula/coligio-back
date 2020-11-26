const service = require('../services/usuario.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth')

const post = async (req, res) => {
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
  
const get = async (req, res, next) => {
  try {
    
    const usuarios = await service.get();

    return res.status(200).json(usuarios);
  } catch (e) {
    const errorMsg = 'Erro ao buscar usuários';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};
  
const getById = async (req, res, next) => {
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

const put = async (req, res, next) => {
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

const deleteById = async (req, res, next) => {
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

const login = async(req, res) => {
  try {
    const { email, senha } = req.body;
    const resultado = await service.login(email, senha);

    if (!resultado)
      return res.status(404).json({ error: 'Email ou senha inválidas' });

    const { usuario, token } = resultado;

    return res.json({ usuario, token });
  } catch (e) {
    console.log(e)
    const message = 'Erro ao realizar login. ';

    res.status(500).json({ error: `${message} ${e.message}` });
    return e.message();
  }
}


module.exports = {
  post,
  get,
  getById,
  put,
  deleteById,
  login
}
