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
      }
    },
    {}
  );
  Usuario.belongsToMany(sequelize.models.Disciplina, {
    through: sequelize.models.Matricula,
    as: 'disciplinas',
    foreignKey: 'usuarioId'
  });
  sequelize.models.Disciplina.belongsToMany(sequelize.models.Usuario, {
    through: sequelize.models.Matricula,
    as: 'alunos',
    foreignKey: 'disciplinaId'
  });
  return Usuario;
};