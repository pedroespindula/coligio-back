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

  return Atividade;
};
