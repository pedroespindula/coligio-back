module.exports = (sequelize, Sequelize) => {
  const Matricula = sequelize.define(
    'Matricula',
    { 
      usuarioId: {
          type: Sequelize.INTEGER,
          references: {
            model: sequelize.models.Usuario,
            key: 'id',
            onDelete: 'cascade',
            as: 'aluno'
          },
          allowNull: false
      },
      disciplinaId: {
          type: Sequelize.INTEGER,
          references: {
            model: sequelize.models.Disciplina,
            key: 'id',
            onDelete: 'cascade',
            as: 'disciplina'
          },
          allowNull: false
      },
    },
    {}
  );

  Matricula.associate = (models) => {
    Matricula.belongsTo(models.Disciplina, {
      foreignKey: "disciplinaId",
      as: "disciplina"
    })
    Matricula.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
      as: "aluno"
    })
  }

  return Matricula;
};
