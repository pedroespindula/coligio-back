const { DataTypes } = require('sequelize/types');
const { Usuario } = require('../models');
const disciplina = require('../models/disciplina');

const create = async ({ nome, senha, email,cargo }) => {
  const usuario = await Usuario.findOne({
    where: {
      email,
    },
  });

  if (usuario) {
    return;
  }

  const novoUsuario = await Usuario.create({
    nome,
    senha,
    email,
    cargo
  });

  return novoUsuario;
};

const get = async () => {
  const usuarios = await Usuario.findAll();

  return usuarios;  
};

const getById = async (id) => {
  const usuario = await Usuario.findByPk(id);

  return usuario;  
};

const edit = async (id, data) => {
  const usuario = await getById(id);

  await usuario.update(data);

  return usuario;
};

const deleteById = async (id) => {
  const usuario = await getById(id);

  const usuarioDeletado = await usuario.destroy();

  return usuarioDeletado;
};

const subscribeUser = async (userId, disciplinaId) => {
  const usuario = await getById(userId);

  const { disciplinaService } = require('./disciplina.service');
  const disciplina = disciplinaService.getById(disciplinaId);

  if( !(usuario && disciplina)){
    return;
  }  
  const userSubscribed = usuario.disciplinasMatriculadas.push(disciplina);
  return userSubscribed;
};


module.exports = {
  create,
  get,
  getById,
  edit,
  deleteById,
  subscribeUser
}
