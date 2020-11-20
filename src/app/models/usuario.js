const { DataTypes } = require("sequelize/types");
const disciplina = require("./disciplina");

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
        allowNull: false
      },
      senha: { 
        type: Sequelize.STRING,
        allowNull: false
      },
      cargo: {
        type: Sequelize.ENUM,
        values: ["professor", "aluno"],
        allowNull: false
      },
      disciplinas_matriculadas:{
        type: DataTypes.ARRAY(disciplina),
        allowNull: true
      }
    },
    {}
  );

  return Usuario;
};