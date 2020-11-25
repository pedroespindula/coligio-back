const { Matricula } = require('../models');
const { Usuario } = require('../models');
const { Disciplina } = require('../models');

const matriculaAluno = async(usuarioId,disciplinaId) => {
    const disciplina = await Disciplina.findByPk(disciplinaId);
    const usuario = await Usuario.findByPk(usuarioId);

    if(!disciplina){
      return null;
    }
    if(!usuario){
      return null;
    }
    const novaMatricula = await Matricula.create({
      usuarioId,
      disciplinaId
    });

    return novaMatricula;
};

module.exports = {
    matriculaAluno
}