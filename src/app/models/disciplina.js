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
      professorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  //Uma atividade pertence a uma disciplina
  sequelize.models.Atividade.belongsTo(Disciplina, {
    foreignKey: 'disciplinaId',
    as: 'disciplina'
  });
  //Uma disciplina pode ter várias atividades
  Disciplina.hasMany(sequelize.models.Atividade, {
    foreignKey: 'disciplinaId',
    as: 'atividades'
  });
  return Disciplina;
};