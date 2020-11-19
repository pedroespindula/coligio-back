const disciplina = require("usuario");
const usuario = require("disciplina");
const atividade = require('atividade');

/* Relacionamento usuários e disciplinas*/
disciplina.belongsToMany(usuario, {
    through: 'fatos_usuarios_disciplinas',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

/** Relacionamento atividade e disciplina*/
disciplina.hasMany(atividade, {
    foreignKey: 'disciplidaId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
atividade.belongsTo(disciplina);
