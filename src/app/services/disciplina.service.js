const { Disciplina, Matricula } = require('../models');

const create = async ({nome, semestre, cargaHoraria}, professorId) => {
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
    cargaHoraria,
    professorId
  });

  return novaDisciplina;
};

const getDisciplinasProf = async (usuario) => {
  const disciplinas = await Disciplina.findAll({
    where: {
      professorId: usuario.id
    },
    include: ['professor']
  });

  return disciplinas
}

const get = async (usuario) => {
  if (usuario.cargo == "professor") {
    return getDisciplinasProf(usuario)
  } 

  const matriculas = await Matricula.findAll({
    where: {
      usuarioId: usuario.id
    },
    include: [{
      model: Disciplina,
      as: "disciplina",
      include: ["professor"]
    }]
  });

  return matriculas;  
};

const getById = async (id) => {
  const disciplina = await Disciplina.findByPk(id, {
    include: ['alunos','professor','atividades']
  });

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
