//테스트 코드
const request = require('supertest');
const should = require('should')
const app = require('../../index');
const Users = require('../../models/users');

const users = [
    {name: 'lee'},
    {name: 'kim'},
    {name: 'park'},
    {name: 'choi'},
    {name: 'shin'},
]
//통합테스트 - API의 기능 테스트
describe('GET /users는', () => {
    before(() => Users.sequelize.sync({force: true}))
    before(() => Users.User.bulkCreate(users));

    describe('성공시', () => {
        // before(() => {
        //     return Users.sequelize.sync({force: true});
        // })

        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceof(Array);
                    done();
                })
        })

        it('최대 limit 갯수만큼 응답한다.', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                })
        })
    })

    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done)
        })
    })
})

describe('GET /users/1은', () =>{
    before(() => Users.sequelize.sync({force: true}))
    before(() => Users.User.bulkCreate(users));

    it('성공 시', (done) => {
        request(app)
            .get('/users/1')
            .end((err, res) => {
                console.log('body', res.body);
                res.body.should.have.property('id', 1);
                done();
            })
    })

    describe('실패 시', () => {
        it('id가 숫자가 아닐경우 400 응답', done => {
            request(app)
                .get('/users/seven')
                .expect(400)
                .end(done)
        })

        it('id로 유저를 찾을 수 없는 경우 404 응답', done => {
            request(app)
                .get('/users/7')
                .expect(404)
                .end(done)
        })
    })
})

describe('DELETE/users/1', () => {
    before(() => Users.sequelize.sync({force: true}))
    before(() => Users.User.bulkCreate(users));

    describe('성공 시', () => {
        it('204 응답', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    })

    describe('실패 시', () => {
        it('id가 숫자가 아닐경우 400 응답', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    })
})

describe('POST /users', () => {
    before(() => Users.sequelize.sync({force: true}))
    before(() => Users.User.bulkCreate(users));

    describe('성공 시', () => {
        let body, name='hj';
        before(done => {
            request(app)
                .post('/users')
                .send({name: name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done()
                })
        })

        it('생성된 유저 객체를 반환', () => {
            body.should.have.property('id');
        });

        it('입력된 name을 반환', () => {
            body.should.have.property('name', name)
        });
    })

    describe('실패 시', () => {
        it('name 파라미터 누락 시 400 응답', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });

        it('name 중복 시 409 응답', done => {
            request(app)
                .post('/users')
                .send({name: 'hj'})
                .expect(409)
                .end(done)
        });
    })
})

describe('PUT /users/:id', async () => {
    before(() => Users.sequelize.sync({force: true}))
    before(() => Users.User.bulkCreate(users));

    describe('성공 시', () => {
        const name = 'leecoder';
        it('변경된 name을 응답 ', (done) => {
            request(app)
                .put('/users/4')
                .send({name: name})
                .end((err, res) => {
                    console.log(res.body);
                    res.body.should.have.property('name',name);
                    done();
                })
        });
    })

    describe('실패 시', () => {
        it('정수가 아닌 id일 경우 400 응답', (done) => {
            request(app)
                .put('/users/one')
                .send({name: 'leecoder'})
                .expect(400)
                .end(done)
        });

        it('name이 없을 경우 400 응답', (done) => {
            request(app)
                .put('/users/3')

                .expect(400)
                .end(done)
        });

        it('user가 없을 경우 404 응답', (done) => {
            request(app)
                .put('/users/9')
                .send({name: 'leecoders'})
                .expect(404)
                .end(done)
        });

        it('이름이 중복일 경우 409 응답', (done) => {
            request(app)
                .put('/users/3')
                .send({name: 'leecoder'})
                .expect(409)
                .end(done)
        });
    })
})
