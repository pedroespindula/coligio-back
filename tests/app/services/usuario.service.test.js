const { Usuario } = require('../models');
const { Service } = require('../services/usuario.service');


//Teste de criação de um novo usuário
test("cria novo usuario", () =>{
    expect(Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno")).toBe(Usuario.create("Vitor", "12345678", "vitor@gmail.com", "aluno"));
    expect(Service.create("Victor", "87654321", "victor@gmail.com", "professor")).toBe(Usuario.create("Victor", "87654321", "victor@gmail.com", "professor"));
    expect(Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno")).toBe(null);
});

//Teste de busca de usuários cadastrados
test("busca todos os usuarios", () => {
    expect(Service.get()).toBe([]);

    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.get()).toBe([u1]);

    const u2 = Service.create("Victor", "87654321", "victor@gmail.com", "professor");
    expect(Service.get()).toBe([u1,u2]);
});

//Teste de busca por um usuário específico
test("busca usuario por id", () =>{
    expect(Service.getById(1)).toBe(null);
    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.get(1)).toBe(u1);

    const u2 = Service.create("Victor", "87654321", "victor@gmail.com", "professor");
    expect(Service.get(2)).toBe(u2);

    expect(Service.get(3)).toBe(null);
});

//Teste de edição de usuário
test("edita usuario", () => {
    var u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(u1.nome).toBe("Vitor");
    u1 = Service.edit(1, {nome: "Severino"});
    expect(u1.nome).toBe("Severino");

});

//Teste de deleção de usuário
test("deleta usuario", () =>{
    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.deleteById(1)).toBe(u1);
});


//Teste de login
test("loga usuario", () =>{
    const u1 = Service.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Service.login("vitor@gmail.com", "12345678")).toBe({u1, token:u1.geraToken()});
});
