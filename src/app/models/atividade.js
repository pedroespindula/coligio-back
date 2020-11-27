module.exports = (sequelize, Sequelize) => {
  const Atividade = sequelize.define(
    'Atividade',
    {
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: { 
        type: Sequelize.STRING,
        allowNull: false
      },
      dataEntrega: { 
        type: Sequelize.DATE
      },
      disciplinaId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {}
  );

  Atividade.associate = (models) => {
    //Uma atividade pertence a uma disciplina
    Atividade.belongsTo(models.Disciplina, {
      foreignKey: 'disciplinaId',
      as: 'disciplina'
    });
  }

  return Atividade;
};


