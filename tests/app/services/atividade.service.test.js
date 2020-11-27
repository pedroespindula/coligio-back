const { Disciplina } = require('../../../src/app/models');
const Service = require('../../../src/app/services/atividade.service');

test("cria atividade", async() => {
    const { id } = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60, professorId: 12});
    const date = new Date();

    expect(await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:date }, id)).toEqual(expect.objectContaining({nome:"Projeto Final", descricao:"Nota 10", dataEntrega:date,disciplinaId:id}));
});

test("busca atividades", async() => {
    const { id } = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60, professorId: 12});
    const date = new Date();
    const a1 = await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:date }, id);
    expect(await Service.get()).not.toHaveLength(0);
});

test("busca atividades por id", async() => {
    const { id: disciplinaId } = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60, professorId: 12});
    const date = new Date();
    const { id: atividadeId } = await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:date }, disciplinaId);
    expect(await Service.getById(atividadeId)).toEqual(expect.objectContaining({ nome:"Projeto Final", descricao:"Nota 10", disciplinaId: disciplinaId }));
});

test("edita atividade", async () => {
    const date = new Date();
    const { id: disciplinaId } = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60, professorId: 12});
    const { id: atividadeId } = await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:date }, disciplinaId);
    await Service.edit(atividadeId, {nome:"Projeto Inicial"});
    expect(await Service.getById(atividadeId)).toEqual(expect.objectContaining({ nome:"Projeto Inicial" }));
});

test("deleta atividade", async () => {
    const date = new Date();
    const { id: disciplinaId } = await Disciplina.create({nome:"ES", semestre:"RAE", cargaHoraria:60, professorId: 12});
    const { id: atividadeId } = await Service.create({ nome:"Projeto Final", descricao:"Nota 10", dataEntrega:date }, disciplinaId);
    await Service.deleteById(atividadeId);
    expect(await Service.getById(atividadeId)).toBeNull();
});

