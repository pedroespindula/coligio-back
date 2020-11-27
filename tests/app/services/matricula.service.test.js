const { Disciplina } = require('../../../src/app/models/disciplina');
const { Usuario } = require('../../../src/app/models/usuario');
const { Matricula } = require('../../../src/app/models/matricula');
const { Service } = require('../../../src/app/services/matricula.service');


test("matricula aluno", () => {
    expect(Service.matriculaAluno(1434134,12314)).toThrow(Error);
    const d1 = await Disciplina.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    expect(Service.matriculaAluno(13657,1)).toThrow(Error);
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    expect(Service.matriculaAluno(1,1)).toContain({usuarioId:1, disciplinaId:1});
    expect(Service.matriculaAluno(1,1)).toBeNull();
});

test("desmatricula aluno", () => {
    expect(Service.desmatriculaAluno(1,1)).toBeNull();
    const d1 = await Disciplina.create({nome:"engenharia de software", semestre:"RAE", carga:60}, 4);
    expect(Service.desmatriculaAluno(1,1)).toBeNull();
    const u1 = await Usuario.create({nome:"Vitor", senha:"1234", email:"vitor@gmail.com", cargo: "aluno"});
    const m1 = await Matricula.create({usuarioId:1, disciplinaId:1});
    expect(Service.desmatriculaAluno(1,1)).toContain({usuarioId:1, disciplinaId:1});
    expect(Service.desmatriculaAluno(1,1)).toBeNull();
});

