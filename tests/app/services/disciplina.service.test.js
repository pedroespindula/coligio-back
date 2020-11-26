const { Disciplina } = require('../../../src/app/models');
const { Service } = require('../../../src/app/services/disciplina.service');


test("cria disciplina", () => {
    expect(await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4)).toBe(await Disciplina.findOne({where: {nome,semestre},}));
    expect(await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4)).toBe(null);
});

test("busca disciplinas", () => {
    expect(await Service.get()).toBe([]);
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    expect(await Service.get()).toBe([d1]);
    const d2 = await Service.create({nome:"TCC", semestre:"RAE", carga:120}, 21);
    expect(await Service.get()).toBe([d1,d2]);
});

test("busca disciplinas por id", () =>{
    expect(await Service.getById(1)).toBe(null);
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    expect(await Service.getById(1)).toBe(d1);
    const d2 = Service.create({nome:"TCC", semestre:"RAE", carga:120}, 21);
    expect(await Service.getById(2)).toBe(d2);
    expect(await Service.getById(141)).toBe(null);
});

test("busca alunos da disciplina", () => {
    expect(await Service.getAlunosDisciplina(123)).toBe(null);
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    const { Usuario } = require('../../../src/app/models/usuario');
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    expect(await Service.getAlunosDisciplina(1)).toBe([u1]);
});


test("deleta disciplina", () => {
    expect(Service.deleteById(3411)).toBe(null);
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);    
    expect(Service.deleteById(1)).toBe(d1);
});

test("adiciona aluno a disciplina", ()=> {
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    const { Usuario } = require('../../../src/app/models/usuario');
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    expect(await addUserToDisciplina(u1,d1)).toBe(d1.matriculados);
});


test("remove aluno de disciplina", () =>{
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    const { Usuario } = require('../../../src/app/models/usuario');
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    expect(await Service.removeUserFromDisciplina(u1, d1)).toBe(null);
    await addUserToDisciplina(u1,d1);
    expect(await Service.removeUserFromDisciplina(u1, d1)).toBe(null);
    await addUserToDisciplina(u1,d1);
    const m1 = 
    expect(await Service.removeUserFromDisciplina(u1, d1)).toBe(null);

});
