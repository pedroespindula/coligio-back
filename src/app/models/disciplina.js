const { DataTypes } = require("sequelize/types");
const usuario = require("./usuario");

module.exports = (sequelize, Sequelize) => {
    const Disciplina = sequelize.define(
      'Disciplina',
      {
       
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        semestre: {
            type: Sequelize.STRING,
            allowNull: false
          },
        cargaHoraria: { 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        matriculados:{
          type: DataTypes.ARRAY(usuario),
          allowNull: false
        }
      },
      {}
    );
  
    return Disciplina;
  };