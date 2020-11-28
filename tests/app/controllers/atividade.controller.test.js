const {Service} = require('../../../src/app/services/disciplina.service');
const {Controller} = require('../../../src/app/controllers/disciplina.controller');
const {Disciplina} = require('../../../src/app/models/disciplina')
const {Usuario} = require('../../../src/app/models/usuario');
const { request, response } = require('express');


test("post de disciplina", async () => {
    expect(await Controller.post({atividade:{ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, idDisc: 2525})).toThrow(Error);
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    expect(await Controller.post({atividade:{ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, idDisc: 2525})).toContain("Projeto Final");
    expect(await Controller.post({atividade:{ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, idDisc: 2525})).toContain('Atividade já existe');
});
test("get disciplina", async () => {
    expect(Controller.get()).toHaveLength(0);
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    const a1 = Service.create({nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1);
    expect(Controller.get()).toHaveLength(1);    
    const a2 = Service.create({nome:"Prova Final", descricao:"Nota 10", dataEntrega:"27/12/2020" }, 1);
    expect(Controller.get()).toHaveLength(2);  
});
test("get disciplina por id", async() => {
    expect(Controller.getById(342)).toContain('Atividade não encontrada');
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria: 60, professorId: 1});
    const a1 = Service.create({nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1);
    expect(Controller.getById(1)).toContain('Projeto Final');
    const a2 = Service.create({nome:"Prova Final", descricao:"Nota 10", dataEntrega:"27/12/2020" }, 1);
    expect(Controller.getById(2)).toContain('Prova Final');
});

test("put atividade", async () => {
    const a1 = Service.create({nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1);
    expect(Controller.put({id:1, data:{dataEntrega: "12/12/2020"}})).toContain("12/12/2020");
    expect(Controller.put({id:2532, data:{dataEntrega: "12/12/2020"}})).toContain('Atividade não encontrada');
});
test("deleta atividade por id", async () => {
    const a1 = Service.create({nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1);
    expect(Controller.deleteById(1)).toContain(a1);
    expect(Controller.deleteById(11413)).toContain("Atividade não encontrada");
});

