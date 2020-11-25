const service = require('../services/matricula.service');

const post = async (req, res) => {
    try {
        const { idDisc, idAluno } = req.params;
        const usuario = await service.matriculaAluno(idAluno, idDisc);

        if (!usuario) return res.status(404).json({ error: 'Usuario ou Disciplina não encontrados' });

        return res.status(201).json(usuario);
    } catch (e) {
        const errorMsg = 'Erro ao matricular aluno na disciplina. ';

        console.error(errorMsg, '', e.message);
        return res.status(500).json({ error: `${errorMsg} ${e.message}` });
    }
};

module.exports = {
    post
}