const service = require('../services/matricula.service');

const matriculaAluno = async (req, res) => {
    try {
        const { idDisc, idAluno } = req.params;
        const usuario = await service.matriculaAluno(idAluno, idDisc);

        if (!usuario) return res.status(404).json({ error: 'Matrícula já cadastrada' });

        return res.status(201).json(usuario);
    } catch (e) {
        const errorMsg = 'Erro ao matricular aluno na disciplina. ';

        console.error(errorMsg, '', e.message);
        return res.status(500).json({ error: `${errorMsg} ${e.message}` });
    }
};

const desmatriculaAluno = async (req, res) => {
    try {
      const { idDisc, idAluno } = req.params;
      
      const usuario = await service.desmatriculaAluno(idAluno, idDisc);
  
      if (!usuario) res.status(404).json({ error: 'Usuário não encontrado' });
  
      return res.status(200).json(usuario);
    } catch (e) {
      const errorMsg = 'Erro ao buscar usuário por id';
      
      console.error(errorMsg, '', e.message);
      return res.status(500).json({ error: `${errorMsg} ${e.message}` });
    }
  };

module.exports = {
    matriculaAluno,
    desmatriculaAluno
}