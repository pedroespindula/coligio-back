const { Usuario } = require('../models');

const create = async ({
  nome, senha, email
}) => {
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
    email
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

module.exports = {
  create,
  get,
  getById,
  edit,
  deleteById
}