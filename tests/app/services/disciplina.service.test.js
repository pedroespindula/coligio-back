const UsuarioService = require('../../../src/app/services/usuario.service');
const Service  = require('../../../src/app/services/disciplina.service');


let professor;
const criaProfessor = async () => {
    professor = await UsuarioService.create({nome: "Vitor", senha: "12345678", email: "vitor@gmail.com", cargo: "professor"});

    if (!professor) {
        professores = await UsuarioService.get();
        professor = professores[0];
    }
}

test("cria disciplina", async() => {
    await criaProfessor();
    await Service.deleteByName('engenharia de software');
    expect(await Service.create({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60}, professor.id)).toEqual(expect.objectContaining({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60}));
});

test("busca disciplinas", async () => {
    await Service.deleteByName('engenharia de software');
    await Service.create({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60}, professor.id);
    expect(await Service.get()).not.toHaveLength(0);
});

test("busca disciplinas por id", async() =>{
    await Service.deleteByName('engenharia de software');
    const { id } = await Service.create({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60}, professor.id);
    expect(await Service.getById(id)).toEqual(expect.objectContaining({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60}));
});


test("deleta disciplina", async() => {
    await Service.deleteByName('engenharia de software');
    const { id } = await Service.create({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60}, professor.id);
    await Service.deleteById(id);
    expect(await Service.getById(id)).toBeNull();
});

// test("busca alunos da disciplina", async() => {
//     const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
//     const { Usuario } = require('../../../src/app/models/usuario');
//     const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
//     expect(await Service.getAlunosDisciplina(1)).toHaveLength(0);
//     const { Matricula } = require('../../../src/app/services/matricula.service');
//     const m1 = await Matricula.matriculaAluno(1,1);    
//     expect(await Service.getAlunosDisciplina(1)).toHaveLength(1);
// });

// test("adiciona aluno a disciplina", async() => {
//     expect(await addUserToDisciplina(354,214)).toBeNull();
//     const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
//     const { Usuario } = require('../../../src/app/models/usuario');
//     const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
//     const { Matricula } = require('../../../src/app/services/matricula.service');
//     const m1 = await Matricula.matriculaAluno(1,1);    
//     expect(await addUserToDisciplina(u1,d1)).toHaveLength(1);
// });


// test("remove aluno de disciplina", async() =>{
//     const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
//     const { Usuario } = require('../../../src/app/models/usuario');
//     const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
//     expect(await Service.removeUserFromDisciplina(u1, d1)).toBeNull();
//     await addUserToDisciplina(u1,d1);
//     expect(await Service.removeUserFromDisciplina(u1, d1)).toContain({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
//     expect(await Service.removeUserFromDisciplina(u1, d1)).toBeNull();
// });
