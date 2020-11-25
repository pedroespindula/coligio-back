const { Usuario } = require('../models');

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
  const usuarios = await Usuario.findAll({
    include: ['disciplinas', 'disciplinasProfessor']
  });

  return usuarios;  
};

const getById = async (id) => {
  const usuario = await Usuario.findByPk(id, {
    include: ['disciplinas', 'disciplinasProfessor']
  });

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
  const disciplina = await disciplinaService.getById(disciplinaId);

  if( usuario && disciplina){
    if(await usuario.disciplinasMatriculadas.indexOf(disciplina) == -1){
      const userSubscribed = await usuario.disciplinasMatriculadas.push(disciplina);
      await disciplinaService.addUserToDisciplina(usuario, disciplina);

      return userSubscribed;
    }
  }
  return;
};

const unsubscribeUser = async (userId, disciplinaId) => {
  const usuario = await getById(userId);

  const { disciplinaService } = require('./disciplina.service');
  const disciplina = await disciplinaService.getById(disciplinaId);

  if(usuario && disciplina){
    const index = await usuario.disciplinasMatriculadas.indexOf(disciplina);
    if(index > -1){
      const userUnsubscribed = await usuario.disciplinasMatriculadas.splice(index, 1);
      await disciplinaService.removeUserFromDisciplina(usuario, disciplina);
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
