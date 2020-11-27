const { Disciplina } = require('../../../src/app/models');
const Service  = require('../../../src/app/services/disciplina.service');


test("cria disciplina", async() => {
    expect(await Service.create({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60})).toContain({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60});
    expect(await Service.create({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60})).toBeNull();
});

test("busca disciplinas", async() => {
    expect(await Service.get()).toHaveLength(0);
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    expect(await Service.get()).toHaveLength(1);
    const d2 = await Service.create({nome:"TCC", semestre:"RAE", carga:120}, 21);
    expect(await Service.get()).toHaveLength(2);
});

test("busca disciplinas por id", async() =>{
    expect(await Service.getById(1)).toBeNull();
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    expect(await Service.getById(1)).toContain({nome:"engenharia de software", semestre:"RAE", carga:60});
    const d2 = Service.create({nome:"TCC", semestre:"RAE", carga:120}, 21);
    expect(await Service.getById(2)).toContain({nome:"TCC", semestre:"RAE", carga:120});
    expect(await Service.getById(141)).toBeNull();
});

test("busca alunos da disciplina", async() => {
    expect(await Service.getAlunosDisciplina(123)).toBeNull();
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    const { Usuario } = require('../../../src/app/models/usuario');
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    expect(await Service.getAlunosDisciplina(1)).toHaveLength(0);
    const { Matricula } = require('../../../src/app/services/matricula.service');
    const m1 = await Matricula.matriculaAluno(1,1);    
    expect(await Service.getAlunosDisciplina(1)).toHaveLength(1);
});


test("deleta disciplina", async() => {
    expect(await Service.deleteById(3411)).toBeNull();
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);    
    expect(await Service.deleteById(1)).toContain({nome:"engenharia de software", semestre:"RAE", carga:60});
    expect(await Service.deleteById(1)).toBeNull();
});

test("adiciona aluno a disciplina", async() => {
    expect(await addUserToDisciplina(354,214)).toBeNull();
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    const { Usuario } = require('../../../src/app/models/usuario');
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    const { Matricula } = require('../../../src/app/services/matricula.service');
    const m1 = await Matricula.matriculaAluno(1,1);    
    expect(await addUserToDisciplina(u1,d1)).toHaveLength(1);
});


test("remove aluno de disciplina", async() =>{
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    const { Usuario } = require('../../../src/app/models/usuario');
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    expect(await Service.removeUserFromDisciplina(u1, d1)).toBeNull();
    await addUserToDisciplina(u1,d1);
    expect(await Service.removeUserFromDisciplina(u1, d1)).toContain({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    expect(await Service.removeUserFromDisciplina(u1, d1)).toBeNull();
});
