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
    },
    {}
  );
  return Disciplina;
};