const { Disciplina } = require('../../../src/app/models/disciplina');
const { Usuario } = require('../../../src/app/models/usuario');
const {Atividade} = require('../../../src/app/models/atividade');
const { Service } = require('../../../src/app/services/atividade.service');



test("cria atividade", () => {
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60}, 12);
    expect(await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1)).toContain({nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020",disciplinaId:1});
    expect(await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1)).toBeNull();    
});

test("busca atividades", () => {
    expect(await Service.get()).toHaveLength(0);
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60}, 12);
    const a1 = await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1);
    expect(await Service.get()).toHaveLength(1);
});

test("busca atividades por id", () => {
    expect(await Service.getById(1)).toBeNull();
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60}, 12);
    const a1 = await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1);
    expect(await Service.getById(1)).toContain({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" });
});

test("edita atividade", () => {
    expect(await Service.edit(198, {nome:"Projeto Inicial"})).toBeNull();
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60}, 12);
    const a1 = await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1);
    expect(await Service.edit(1, {nome:"Projeto Inicial"})).toContain({nome:"Projeto Inicial",disciplinaId:1});
});

test("deleta atividade", () => {
    expect(await Service.deleteById(341)).toBeNull();
    const d1 = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60}, 12);
    const a1 = await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:"27/11/2020" }, 1);
    expect(await Service.deleteById(1)).toContain(a1);
});

