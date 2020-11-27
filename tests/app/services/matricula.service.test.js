const { Disciplina } = require('../../../src/app/models/disciplina');
const { Usuario } = require('../../../src/app/models/usuario');
const { Matricula } = require('../../../src/app/models/matricula');
const Service = require('../../../src/app/services/matricula.service');
const DisciplinaService = require('../../../src/app/services/disciplina.service');
const AlunoService = require('../../../src/app/services/usuario.service');

let aluno;
const criaAluno = async () => {
    aluno = await AlunoService.create({nome: "Vitor", senha: "12345678", email: "vitor@gmail.com", cargo: "professor"});

    if (!aluno) {
        alunos = await AlunoService.get();
        aluno = alunos[0];
    }
}

test("matricula aluno", async () => {
    await criaAluno();
    await DisciplinaService.deleteByName('engenharia de software');
    const d = await DisciplinaService.create({nome:"engenharia de software", semestre:"RAE", cargaHoraria:60}, aluno.id);
    expect(await Service.matricular(d.id,aluno.id)).not.toBeNull();
});

test("desmatricula aluno", async () => {
    await DisciplinaService.deleteByName('engenharia de software 2');
    const d = await DisciplinaService.create({nome:"engenharia de software 2", semestre:"RAE", cargaHoraria:60}, aluno.id);
    await Service.matricular(d.id,aluno.id)
    expect(await Service.desmatricular(d.id,aluno.id)).not.toBeNull();
});

