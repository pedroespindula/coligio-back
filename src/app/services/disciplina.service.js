const { Disciplina } = require('../models');

const create = async ({ instituicao, nome, semestre, cargaHorario, professor }) => {
  let id = instituicao + ' ' + nome + ' ' + semestre
    const disciplina = await Disciplina.findOne({
    where: {
      id,
    },
  });

  if (disciplina) {
    return;
  }

  const novaDisciplina = await Disciplina.create({
    instituicao,
    nome,
    semestre,
    cargaHorario,
    professor
  });

  return novaDisciplina;
};

const get = async () => {
  const disciplinas = await Disciplina.findAll();

  return disciplinas;  
};

const getById = async (id) => {
  const disciplina = await Disciplina.findByPk(id);

  return disciplina;  
};


const deleteById = async (id) => {
  const disciplina = await getById(id);

  const disciplinaApagada = await disciplina.destroy();

  return disciplinaApagada;
};

module.exports = {
  create,
  get,
  getById,
  deleteById
}