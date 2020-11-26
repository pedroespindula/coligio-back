const { Disciplina } = require('../../../src/app/models/disciplina');
const { Usuario } = require('../../../src/app/models/usuario');
const { Matricula } = require('../../../src/app/models/matricula');
const { Service } = require('../../../src/app/services/disciplina.service');


test("matricula aluno", () => {
    expect(Service.matriculaAluno(1434134,12314)).toBe(Error);
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    expect(Service.matriculaAluno(13657,1)).toBe(Error);
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    expect(Service.matriculaAluno(1,1)).toBe(await Matricula.create({usuarioId:1, disciplinaId:1}));
    expect(Service.matriculaAluno(1,1)).toBe(null);
});

test("desmatricula aluno", () => {
    expect(Service.desmatriculaAluno(1,1)).toBe(null);
    const d1 = await Service.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    expect(Service.desmatriculaAluno(1,1)).toBe(null);
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    const m1 = await Matricula.create({usuarioId:1, disciplinaId:1});
    expect(Service.desmatriculaAluno(1,1)).toBe(m1);
});

