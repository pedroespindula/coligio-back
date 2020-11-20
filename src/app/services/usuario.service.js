const { DataTypes } = require('sequelize/types');
const { Usuario } = require('../models');
const disciplina = require('../models/disciplina');
const usuario = require('../models/usuario');

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

const getDisciplinasMatriculadas = async(id) =>{
  const usuario = await getById(id);
  if(!usuario){
    return;
  }
  return usuario.disciplinasMatriculadas;
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

  if( usuario && disciplina){
    if(usuario.disciplinasMatriculadas.indexOf(disciplina) == -1){
      const userSubscribed = usuario.disciplinasMatriculadas.push(disciplina);
      disciplinaService.addUserToDisciplina(usuario, disciplina);

      return userSubscribed;
    }
  }
  return;
};

const unsubscribeUser = async (userId, disciplinaId) => {
  const usuario = await getById(userId);

  const { disciplinaService } = require('./disciplina.service');
  const disciplina = disciplinaService.getById(disciplinaId);

  if(usuario && disciplina){
    const index = usuario.disciplinasMatriculadas.indexOf(disciplina);
    if(index > -1){
      const userUnsubscribed = usuario.disciplinasMatriculadas.splice(index, 1);
      disciplinaService.removeUserFromDisciplina(usuario, disciplina);
      return userSubscribed;
    }
  }

  return ;
};


module.exports = {
  create,
  get,
  getById,
  getDisciplinasMatriculadas,
  edit,
  deleteById,
  subscribeUser,
  unsubscribeUser
}
