module.exports = (sequelize, Sequelize) => {
    const Disciplina = sequelize.define(
      'Disciplina',
      {
        instituicao: {
            type: Sequelize.STRING,
            allowNull: false
          },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        semestre: {
            type: Sequelize.STRING,
            allowNull: false
          },
        cargaHorario: { 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        professor: { 
            type: Sequelize.USUARIO,
            allowNull: false
        },
      },
      {}
    );
  
    return Disciplina;
  };