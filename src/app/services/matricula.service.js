const { Matricula } = require('../models');
const { Usuario } = require('../models');
const { Disciplina } = require('../models');

const matricular = async (disciplinaId, usuarioId) => {
    const disciplina = await Disciplina.findByPk(disciplinaId);

    if(!disciplina){
      throw new Error("Disciplina não encontrada");
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

const desmatricular = async (disciplinaId, usuarioId) => {
  const matricula = await Matricula.findOne({
    where: {
      usuarioId,
      disciplinaId
    },
  });

  if (!matricula) {
    return null
  }

  const matriculaDeletada = await matricula.destroy();

  return matriculaDeletada;
};

module.exports = {
    matricular,
    desmatricular
}
