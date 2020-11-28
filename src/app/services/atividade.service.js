const { Atividade } = require('../models');

const create = async ({ nome, descricao, dataEntrega }, disciplinaId) => {

  const atividade = await Atividade.findOne({
    where: {
      nome,
      disciplinaId
    },
  });

  if (atividade) {
    return;
  }

  const novaAtividade = await Atividade.create({
    nome,
    descricao,
    dataEntrega,
    disciplinaId
  });

  return novaAtividade;
};

const get = async (disciplinaId) => {
  const atividades = await Atividade.findAll({
    where: {
      disciplinaId
    },
    include: 'disciplina'
  });

  return atividades;  
};

const getById = async (id) => {
  const atividade = await Atividade.findByPk(id);

  return atividade;  
};

const edit = async (id, data) => {
  const atividade = await getById(id);

  await atividade.update(data);

  return atividade;
};

const deleteById = async (id) => {
  const atividade = await getById(id);

  const atividadeDeletada = await atividade.destroy();

  return atividadeDeletada;
};

module.exports = {
  create,
  get,
  getById,
  edit,
  deleteById
}
