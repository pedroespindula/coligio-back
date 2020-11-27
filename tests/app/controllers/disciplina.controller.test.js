const {Service} = require('../../../src/app/services/disciplina.service');
const {Controller} = require('../../../src/app/controllers/disciplina.controller');
const {Disciplina} = require('../../../src/app/models/disciplina')
const {Usuario} = require('../../../src/app/models/usuario');
const { request, response } = require('express');

test("post de disciplina", () => {

    expect(await Controller.post({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1})).toContain({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(await Controller.post({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1})).toContain('Disciplina já existe');

});

test("get disciplina", () => {
    expect(await Controller.get()).toContain('Erro ao buscar disciplina');
    const novaDisciplina = await Service.create({nome:"ES", semestre:"RAE", cargaHoraria: 60}, 1);
    expect(await Controller.get()).toHaveLength(1);
    const novaDisciplina2 = await Service.create({nome:"TCC", semestre:"RAE", cargaHoraria: 430}, 1);
    expect(await Controller.get()).toHaveLength(2);
    const novaDisciplina3 = await Service.create({nome:"CDP", semestre:"RAE", cargaHoraria: 60}, 1);
    expect(await Controller.get()).toHaveLength(3);
});

test("get disciplina a partir de um id", () =>{
    expect(Controller.getbyId(13143)).toContain('Disciplina não encontrada');
    const novaDisciplina = Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(Controller.getbyId(1)).toContain({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});

});

test("Deleta disciplina a partir de um id", () =>{
    expect(Controller.deleteById(13143)).toContain('Disciplina não encontrada');
    const novaDisciplina = Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(Controller.deleteById(1)).toContain({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(Controller.deleteById(1)).toContain('Disciplina não encontrada');
});


test("Teste geral", async () => {
    expect(await Controller.post({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1})).toContain({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(await Controller.get()).toHaveLength(1);
    expect(await Controller.post({nome:"TCC", semestre:"RAE", cargaHoraria: 430, professorId:1})).toContain({nome:"TCC", semestre:"RAE", cargaHoraria: 430, professorId:1});
    expect(await Controller.get()).toHaveLength(2);
    expect(Controller.deleteById(1)).toContain({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(Controller.deleteById(2)).toContain({nome:"TCC", semestre:"RAE", cargaHoraria: 430, professorId:1});
});
