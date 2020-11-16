const { Atividade } = require('../models');

const create = async ({ nome, descricao, dataEntrega }) => {

  const novaAtividade = await Atividade.create({
    nome,
    descricao,
    dataEntrega
  });

  return novaAtividade;
};

const get = async () => {
  const atividades = await Atividade.findAll();

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