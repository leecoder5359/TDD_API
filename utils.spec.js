const utils = require("./utils");
const assert = require("assert");
const should = require("should");
const request = require("supertest");


//단위테스트 - 함수의 기능테스트
describe("utils.js의 capitialize 모듈은", () => {
    it('문자열의 첫번째 문자를 대문자로 변환한다.', () => {
        const result = utils.capitialize('hello');
        result.should.be.equal('Hello')
    })
})

