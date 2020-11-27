const {Service} = require('../../../src/app/services/disciplina.service');
const {Controller} = require('../../../src/app/controllers/disciplina.controller');
const {Disciplina} = require('../../../src/app/models/disciplina')
const {Usuario} = require('../../../src/app/models/usuario')

test("valida professor", () => {
    expect(Controller.validaProfessor(213)).toThrow(Error);
    const {UService} = require('../../../src/app/services/usuario.service');
    const u1 = UService.create("Vitor", "12345678", "vitor@gmail.com", "aluno");
    expect(Controller.validaProfessor(1)).toThrow(Error);
    const u2 = UService.create("Victor", "12345678", "victor@gmail.com", "professor");
    expect(Controller.validaProfessor(2)).toBeNull();
});

test("post de disciplina", () => {




});
/*
post
get
getById
deleteById
*/