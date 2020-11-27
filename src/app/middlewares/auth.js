const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const config = require('../../config/auth');
const { Usuario } = require('../models');


const EXPIRATION_TIME_RESET_PASSWORD = 86400;

const verificarToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res
      .status(401)
      .json({ error: 'Acesso negado. Token não fornecido.' });

  const [tipo, token] = authorization.split(' ');

  if (!tipo || !token || tipo !== 'Bearer')
    return res
      .status(401)
      .json({ error: 'Acesso negado. Token não fornecido.' });

  try {
    const decodificado = jwt.verify(token, config.secret);
    req.usuario = decodificado;

    return next();
  } catch (e) {
    return res.status(400).json({ error: 'Token inválido.' });
  }
};

function resetaToken(usuario) {
  return jwt.sign({ id: usuario.id, email: usuario.email }, config.secret, {
    expiresIn: EXPIRATION_TIME_RESET_PASSWORD,
  });
}

async function checaTokenParaReset(token) {
  try {
    const decodificado = jwt.verify(token, config.JWT.secret);
    const dataExpiracao = new Date(decodificado.exp * 1000);

    if (new Date() > dataExpiracao) {
      throw new Error('Token expirou.');
    }

    return decodificado;
  } catch (error) {
    throw new Error('Falha na verificação do token.');
  }
}

const verificaPermissoes = (permissoes) => {
  return async (req, res, next) => {
    try {
      const usuario = await Usuario.findByPk(req.usuario.id);

      if (!permissoes.includes(usuario.cargo))
        throw new Error('Usuário não possui permissão.')

      req.usuario = usuario;

      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
};

const estaLogado = (req, res, next) => {
  const { authorization } = req.headers;
  req.logado = false;

  if (!authorization) return next();

  const [type, token] = authorization.split(' ');

  if (!type || !token || type !== 'Bearer') return next();

  try {
    const decodificado = jwt.verify(token, config.JWT.secret);
    req.usuario = decodificado;
    req.logado = true;

    return next();
  } catch (e) {
    return res.status(400).json({ error: 'Token inválido.' });
  }
};

module.exports = {
  verificarToken,
  resetaToken,
  verificaPermissoes,
  checaTokenParaReset,
  estaLogado,
};
