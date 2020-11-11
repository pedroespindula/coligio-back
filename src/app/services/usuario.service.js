const { Usuario } = require('../models');

exports.create = async ({
  nome, senha, email, cpf,
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
    email,
    cpf
  });

  return novoUsuario;
};
