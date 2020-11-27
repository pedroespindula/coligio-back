const { Usuario } = require('../../../src/app/models');
const Service = require('../../../src/app/services/usuario.service');


let aluno;
const criaAluno = async () => {
    aluno = await Service.create({nome: "Vitor", senha: "12345678", email: "vitor@gmail.com", cargo: "professor"});

    if (!aluno) {
        alunos = await Service.get();
        aluno = alunos[0];
    }
}

//Teste de busca de usuários cadastrados
test("busca todos os usuarios", async() => {
    await criaAluno();
    expect(await Service.get()).not.toHaveLength(0);
});

// //Teste de busca por um usuário específico
test("busca usuario por id", async() =>{
    expect(await Service.getById(aluno.id)).not.toBeNull();
});

// //Teste de edição de usuário
test("edita usuario", async() => {
    await Service.edit(aluno.id, {nome: "Severino"});
    expect(await Service.getById(aluno.id)).toEqual(expect.objectContaining({nome:"Severino"}));
});

// //Teste de deleção de usuário
test("deleta usuario", async() =>{
    await Service.deleteById(aluno.id);
    expect(await Service.getById(aluno.id)).toBeNull();
});
