const { Disciplina } = require('../models');
const disciplina = require('../models/disciplina');

const create = async ({nome, semestre, cargaHoraria}) => {
  
    const disciplina = await Disciplina.findOne({
    where: {
      nome,
      semestre
    },
  });

  if (disciplina) {
    return;
  }

  const novaDisciplina = await Disciplina.create({
    nome,
    semestre,
    cargaHoraria

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

const getAlunosDisciplina = async(id) => {
  const disciplina = await getById(id);
  if(! disciplina){
    return;
  }
  return disciplina.matriculados;
};


const deleteById = async (id) => {
  const disciplina = await getById(id);

  const disciplinaApagada = await disciplina.destroy();

  return disciplinaApagada;
};

const addUserToDisciplina = async (user, disciplina) => {
  const matriculados = await disciplina.matriculados.push(user);
  return matriculados;
};

const removeUserFromDisciplina = async (user, disciplina) => {
  const usuarioDesmatriculado = await disciplina.matriculados.splice(await disciplina.matriculados.indexOf(user), 1);
  return  usuarioDesmatriculado;

};


module.exports = {
  create,
  get,
  getById,
  getAlunosDisciplina,
  deleteById,  
  addUserToDisciplina,
  removeUserFromDisciplina
}