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
  //Um usuario pode esta em várias disciplinas
  Usuario.belongsToMany(sequelize.models.Disciplina, {
    through: sequelize.models.Matricula,
    as: 'disciplinas',
    foreignKey: 'usuarioId'
  });
  //Uma disciplina pode ter vários usuários
  sequelize.models.Disciplina.belongsToMany(sequelize.models.Usuario, {
    through: sequelize.models.Matricula,
    as: 'alunos',
    foreignKey: 'disciplinaId'
  });
  //Uma disciplina tem um professor
  sequelize.models.Disciplina.belongsTo(Usuario, {
    foreignKey: 'professorId',
    as: 'professor'
  });
  //Um professor pode estar em várias disciplinas
  Usuario.hasMany(sequelize.models.Disciplina, {
    foreignKey: 'professorId',
    as: 'disciplinasProfessor'
  });
  return Usuario;
};