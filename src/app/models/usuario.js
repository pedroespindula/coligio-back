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

  return Usuario;
};