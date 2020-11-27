const service = require('../services/matricula.service');

const matricular = async (req, res) => {
    try {
        const idDisciplina = req.params.id;
        const idUsuario = req.usuario.id;

        const disciplina = await service.matricular(idDisciplina, idUsuario);

        if (!disciplina) return res.status(404).json({ error: 'Matrícula já cadastrada' });

        return res.status(201).json(disciplina);
    } catch (e) {
        const errorMsg = 'Erro ao matricular aluno na disciplina. ';

        console.error(errorMsg, '', e.message);
        return res.status(500).json({ error: `${errorMsg} ${e.message}` });
    }
};

const desmatricular = async (req, res) => {
    try {
        const idDisciplina = req.params.id;
        const usuarioId = req.usuario.id;

        const disciplina = await service.desmatricular(idDisciplina, usuarioId);

        if (!disciplina) return res.status(404).json({ error: 'Matrícula não existe' });

        return res.status(200).json(disciplina);
    } catch (e) {
      const errorMsg = 'Erro ao desmatricular aluno na disciplina';
      
      console.error(errorMsg, '', e.message);
      return res.status(500).json({ error: `${errorMsg} ${e.message}` });
    }
  };

module.exports = {
    matricular,
    desmatricular
}
