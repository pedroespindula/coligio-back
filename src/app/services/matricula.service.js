const { Matricula } = require('../models');
const { Usuario } = require('../models');
const { Disciplina } = require('../models');

const matriculaAluno = async(usuarioId,disciplinaId) => {
    const disciplina = await Disciplina.findByPk(disciplinaId);
    const usuario = await Usuario.findByPk(usuarioId);

    if(!disciplina){
      throw new Error("Disciplina não encontrada");
    }
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const matricula = await Matricula.findOne({
      where: {
        usuarioId,
        disciplinaId
      },
    });
    if(matricula){
      return;
    }

    const novaMatricula = await Matricula.create({
      usuarioId,
      disciplinaId
    });

    return novaMatricula;
};

const desmatriculaAluno = async(usuarioId,disciplinaId) => {
  const disciplina = await Disciplina.findByPk(disciplinaId);
  const usuario = await Usuario.findByPk(usuarioId);

  if(!disciplina){
    return null;
  }
  if(!usuario){
    return null;
  }
  const matricula = await Matricula.findOne({
    where: {
      usuarioId,
      disciplinaId
    },
  });

  const matriculaDeletada = await matricula.destroy();

  return matriculaDeletada;
};

module.exports = {
    matriculaAluno,
    desmatriculaAluno
}