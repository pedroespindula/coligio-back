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

  Disciplina.associate = (models) => {
    //Uma disciplina pode ter várias atividades
    Disciplina.hasMany(models.Atividade, {
      foreignKey: 'disciplinaId',
      as: 'atividades'
    });

    //Uma disciplina pode ter vários usuários
    Disciplina.belongsToMany(models.Usuario, {
      through: sequelize.models.Matricula,
      as: 'alunos',
      foreignKey: 'disciplinaId'
    });

    //Uma disciplina tem um professor
    Disciplina.belongsTo(models.Usuario, {
      foreignKey: 'professorId',
      as: 'professor'
    });
  }
  
  return Disciplina;
};

