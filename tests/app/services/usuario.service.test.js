const { Usuario } = require('../../../src/app/models');
const Service = require('../../../src/app/services/usuario.service');

//Teste de criação de um novo usuário
test("cria novo usuario", async() =>{
    expect(await Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno")).toContain({nome:"Vitor", senha:"12345678", email:"vitor@gmail.com", cargo:"aluno"});
    expect(await Service.create("Victor", "87654321", "victor@gmail.com", "professor")).toContain({nome:"Victor", email:"victor@gmail.com"});
    expect(await Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno")).toBeNull();
    expect(await Service.create("Victor", "87654321", "victor@gmail.com", "professor")).toBeNull();
});

//Teste de busca de usuários cadastrados
test("busca todos os usuarios", async() => {
    expect(await Service.get()).toHaveLength(0);

    const u1 = await Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(await Service.get()).toHaveLength(1);

    const u2 = await Service.create("Victor", "87654321", "victor@gmail.com", "professor");
    expect(await Service.get()).toHaveLength(2);
});

//Teste de busca por um usuário específico
test("busca usuario por id", async() =>{
    expect(await Service.getById(1)).toBeNull();
    const u1 = await Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(await Service.getById(1)).toContain(u1);

    const u2 = Service.create("Victor", "87654321", "victor@gmail.com", "professor");
    expect(await Service.getById(2)).toContain(u2);
    expect(await Service.getById(3)).toBeNull();
});

//Teste de edição de usuário
test("edita usuario", async() => {
    var u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(await Service.edit(1, {nome: "Severino"})).toContain({nome: "Severino"});
    expect(await Service.edit(1, {nome: "Jose"})).toContain({nome: "Jose"});
    expect(await Service.edit(1, {nome: "Adroaldo"})).toContain({nome: "Adroaldo"});
});

//Teste de deleção de usuário
test("deleta usuario", async() =>{
    expect(await Service.deleteById(1)).toBeNull();
    const u1 = await Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(await Service.deleteById(1)).toContain(u1);
});


//Teste de login
test("loga usuario", async() =>{
    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(await Service.login("vitor@gmail.com", "12345678")).toContain({nome:"Vitor", senha:"12345678", email:"vitor@gmail.com", cargo:"aluno"});
});
