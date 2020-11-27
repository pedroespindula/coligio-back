const { Usuario } = require('../../../src/app/models');
const { Service } = require('../../../src/app/services/usuario.service');


//Teste de criação de um novo usuário
test("cria novo usuario", () =>{
    expect(Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno")).toContain({nome:"Vitor", senha:"12345678", email:"vitor@gmail.com", cargo:"aluno"});
    expect(Service.create("Victor", "87654321", "victor@gmail.com", "professor")).toBe({nome:"Victor", email:"victor@gmail.com"});
    expect(Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno")).toBeNull();
    expect(Service.create("Victor", "87654321", "victor@gmail.com", "professor")).toBeNull();
});

//Teste de busca de usuários cadastrados
test("busca todos os usuarios", () => {
    expect(Service.get()).toHaveLength(0);

    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.get()).toHaveLength(1);

    const u2 = Service.create("Victor", "87654321", "victor@gmail.com", "professor");
    expect(Service.get()).toHaveLength(2);
});

//Teste de busca por um usuário específico
test("busca usuario por id", () =>{
    expect(Service.getById(1)).toBeNull();
    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.get(1)).toContain(u1);

    const u2 = Service.create("Victor", "87654321", "victor@gmail.com", "professor");
    expect(Service.get(2)).toContain(u2);

    expect(Service.get(3)).toBeNull();
});

//Teste de edição de usuário
test("edita usuario", () => {
    var u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.edit(1, {nome: "Severino"})).toContain({nome: "Severino"});
    expect(Service.edit(1, {nome: "Jose"})).toContain({nome: "Jose"});
    expect(Service.edit(1, {nome: "Adroaldo"})).toContain({nome: "Adroaldo"});
});

//Teste de deleção de usuário
test("deleta usuario", () =>{
    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.deleteById(1)).toContain(u1);
});


//Teste de login
test("loga usuario", () =>{
    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.login("vitor@gmail.com", "12345678")).toContain({u1});
});
