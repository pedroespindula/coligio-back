const service = require('../services/disciplina.service');

const validaProfessor = async (idProf) => {
  const { Usuario } = require('../models');
  const usuario = await Usuario.findByPk(idProf);

  if(!usuario){
    throw new Error("Usuário não cadastrado.")
  }

  if(usuario.cargo.toLowerCase() == "aluno"){
    throw new Error("Usuário não é um professor.")
  }
}

const post = async (req, res) => {
  try {
    const { idProf } = req.params;
    await validaProfessor(idProf);
    const novaDisciplina = await service.create(req.body,idProf);

    if (!novaDisciplina) return res.status(400).json({ error: 'Disciplina já existe' });

    return res.status(201).json(novaDisciplina);
  } catch (e) {
    const errorMsg = 'Erro ao cadastrar disciplina. ';

    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};
  
const get = async (req, res, next) => {
  try {
    
    const disciplinas = await service.get();

    return res.status(200).json(disciplinas);
  } catch (e) {
    const errorMsg = 'Erro ao buscar disciplina';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};
  
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const disciplina = await service.getById(id);

    if (!disciplina) res.status(404).json({ error: 'Disciplina não encontrada' });

    return res.status(200).json(disciplina);
  } catch (e) {
    const errorMsg = 'Erro ao buscar disciplina por id';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};


const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const disciplina = await service.deleteById(id);

    if (!disciplina) res.status(404).json({ error: 'Disciplina não encontrada' });

    return res.status(200).json(disciplina);
  } catch (e) {
    const errorMsg = 'Erro ao buscar Disciplina por id';
    
    console.error(errorMsg, '', e.message);
    return res.status(500).json({ error: `${errorMsg} ${e.message}` });
  }
};

module.exports = {
  post,
  get,
  getById,
  deleteById
}