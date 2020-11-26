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

const login = async(email, senha) => {
  const usuario = await Usuario.findOne({
    where: { email }
  });

  if (!usuario) return null;

  const senhaValida = await usuario.checaSenha(senha);

  if (!senhaValida) return null

  return {
    usuario,
    token: usuario.geraToken(),
  };
}

module.exports = {
  create,
  get,
  getById,
  edit,
  deleteById,
  login
}
