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

