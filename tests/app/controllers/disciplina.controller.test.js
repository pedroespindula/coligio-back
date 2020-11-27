const {Service} = require('../../../src/app/services/disciplina.service');
const {Controller} = require('../../../src/app/controllers/disciplina.controller');
const {Disciplina} = require('../../../src/app/models/disciplina')
const {Usuario} = require('../../../src/app/models/usuario');
const { request, response } = require('express');

test("valida professor", () => {
    expect(await Controller.validaProfessor(213)).toThrow(Error);
    const {UService} = require('../../../src/app/services/usuario.service');
    const u1 = UService.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(await Controller.validaProfessor(1)).toThrow(Error);
    const u2 = UService.create("Victor", "12345678", "victor@gmail.com", "professor");
    expect(await Controller.validaProfessor(2)).toBeNull();
});

test("post de disciplina", () => {
    const novaDisciplina = Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(await Controller.post(novaDisciplina, response)).toContain(novaDisciplina);
    expect(await Controller.post(novaDisciplina, response)).toContain('Disciplina já existe');

});

test("get disciplina", () => {
    expect(await Controller.get(Request, Response)).toContain('Erro ao buscar disciplina');
    const novaDisciplina = await Service.create({nome:"ES", semestre:"RAE", cargaHoraria: 60}, 1);
    expect(await Controller.get(Request, Response)).toHaveLength(1);
});

test("get disciplina a partir de um id", () =>{
    expect(Controller.getbyId(13143)).toContain('Disciplina não encontrada');
    const novaDisciplina = Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(Controller.getbyId(1)).toContain(novaDisciplina);

});

test("Deleta disciplina a partir de um id", () =>{
    expect(Controller.deleteById(13143)).toContain('Disciplina não encontrada');
    const novaDisciplina = Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(Controller.deleteById(1)).toContain(novaDisciplina);
});
