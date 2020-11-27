const {Service} = require('../../../src/app/services/matricula.service');
const {Controller} = require('../../../src/app/controllers/matricula.controller');
const {Disciplina} = require('../../../src/app/models/disciplina')
const {Usuario} = require('../../../src/app/models/usuario');
const {UService} = require('../../../src/app/services/usuario.service');
const { request, response } = require('express');


test("matricula aluno", async () => {
    const u1 = UService.create({ nome:"Vitor", senha:"12345678", email:"vitor@gmail.com",cargo:"aluno" });
    const u2 = UService.create({ nome:"Victor", senha:"12345678", email:"victor@gmail.com",cargo:"professor" });
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(Controller.matriculaAluno(1,1)).toContain(u1);
    expect(Controller.matriculaAluno(1,1)).toContain({ error: 'Matrícula já cadastrada' });
    expect(Controller.matriculaAluno(1235,12513)).toContain('Erro ao matricular aluno na disciplina. ');
});

test("desmatricula aluno", async () => {
    const u1 = UService.create({ nome:"Vitor", senha:"12345678", email:"vitor@gmail.com",cargo:"aluno" });
    const u2 = UService.create({ nome:"Victor", senha:"12345678", email:"victor@gmail.com",cargo:"professor" });
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    Controller.matriculaAluno(1,1);
    expect(Controller.desmatriculaAluno(1,1)).toContain({usuarioId:1});
    expect(Controller.desmatriculaAluno(1,1)).toContain({ error: 'Usuário não encontrado' });
});
