module.exports = (sequelize, Sequelize) => {
  const Matricula = sequelize.define(
    'Matricula',
    { 
      usuarioId: {
          type: Sequelize.INTEGER,
          references: {
            model: sequelize.models.Usuario,
            key: 'id',
            onDelete: 'cascade'
          },
          allowNull: false
      },
      disciplinaId: {
          type: Sequelize.INTEGER,
          references: {
            model: sequelize.models.Disciplina,
            key: 'id',
            onDelete: 'cascade'
          },
          allowNull: false
      },
    },
    {}
  );
  return Matricula;
};