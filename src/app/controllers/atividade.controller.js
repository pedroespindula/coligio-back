const service = require('../services/atividade.service');

const validaDisciplina = async (idDisc) => {
  const { Disciplina } = require('../models');
  const disciplina = await Disciplina.findByPk(idDisc);

  if(!disciplina){
    throw new Error("Disciplina não cadastrada.")
  }
}

const post = async (req, res) => {
  try {
    const { idDisc } = req.params;
    await validaDisciplina(idDisc);
    const novaAtividade = await service.create(req.body,idDisc);

    if (!novaAtividade) return res.status(400).json({ error: 'Atividade já existe' });

    return res.status(201).json(novaAtividade);
  } catch (e) {
    const errorMsg = 'Erro ao cadastrar atividade. ';

    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};
  
const get = async (req, res, next) => {
  try {
    const disciplinaId = req.params.idDisc;
    
    const atividades = await service.get(disciplinaId);

    return res.status(200).json(atividades);
  } catch (e) {
    const errorMsg = 'Erro ao buscar atividades';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};
  
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const atividade = await service.getById(id);

    if (!atividade) res.status(404).json({ error: 'Atividade não encontrada' });

    return res.status(200).json(atividade);
  } catch (e) {
    const errorMsg = 'Erro ao buscar atividade por id';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};

const put = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dadosAtividade = { ...req.body, updatedAt: new Date() };

    const atividadeAtualizada = await service.edit(id, dadosAtividade);

    if (!atividadeAtualizada) res.status(404).json({ error: 'Atividade não encontrada' });

    return res.status(200).json(atividadeAtualizada);
  } catch (e) {
    const errorMsg = 'Erro ao editar atividade';

    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const atividade = await service.deleteById(id);

    if (!atividade) res.status(404).json({ error: 'Atividade não encontrada' });

    return res.status(200).json(atividade);
  } catch (e) {
    const errorMsg = 'Erro ao buscar atividade por id';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};

module.exports = {
  post,
  get,
  getById,
  put,
  deleteById
}
