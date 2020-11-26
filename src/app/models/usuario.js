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

  //Um usuario pode esta em várias disciplinas
  Usuario.belongsToMany(sequelize.models.Disciplina, {
    through: sequelize.models.Matricula,
    as: 'disciplinas',
    foreignKey: 'usuarioId'
  });
  //Uma disciplina pode ter vários usuários
  sequelize.models.Disciplina.belongsToMany(sequelize.models.Usuario, {
    through: sequelize.models.Matricula,
    as: 'alunos',
    foreignKey: 'disciplinaId'
  });
  //Uma disciplina tem um professor
  sequelize.models.Disciplina.belongsTo(Usuario, {
    foreignKey: 'professorId',
    as: 'professor'
  });
  //Um professor pode estar em várias disciplinas
  Usuario.hasMany(sequelize.models.Disciplina, {
    foreignKey: 'professorId',
    as: 'disciplinasProfessor'
  });

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

