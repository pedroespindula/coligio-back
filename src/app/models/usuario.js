const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/auth')

module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: { 
        type: Sequelize.STRING,
        allowNull: false,
        lowercase: true
      },
      senha: { 
        type: Sequelize.STRING,
        allowNull: false,
        select: false
      },
      cargo: {
        type: Sequelize.ENUM,
        values: ["professor", "aluno"],
        allowNull: false
      }
    },
    {}
  );

  Usuario.beforeSave(async function(usuario){
    const hash = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = hash;
    return usuario
  })

  Usuario.prototype.checaSenha = function checkPassword(senha) {
    return bcrypt.compare(senha, this.senha);
  };
  
  Usuario.prototype.geraToken = function generateAuthToken(expira = true) {
    const { secret, diasParaExpirar } = config;
    if (expira) {
      return jwt.sign({ id: this.id }, secret, {
        expiresIn: `${diasParaExpirar}d`,
      });
    }
    return jwt.sign({ id: this.id }, secret);
  };

  return Usuario;
};

