const conf = require("../../../config/" + process.env.NODE_ENV + ".js");

const chai = require("chai");
let expect = require("chai").expect;
const should = chai.should();
const chaiHttp = require('chai-http');

const sinon = require('sinon');
const { mock } = require('sinon');

const Db = require("../../../loaders/mysql");
var db = new Db(conf.mysql);
db.query();
const UsersDao = require("../database/queries/user");
var usersDao = new UsersDao(db);

chai.use(chaiHttp);

describe('Test user specific unit test cases', () => {

    let dbCallStub;
    beforeEach(() => {
        dbCallStub = sinon.stub(db, 'query');
    })
    afterEach(() => {
        dbCallStub.restore();
    })

    describe('trying to stub database result /GET user', () => {
        it('find all users', async () => {
            let resp = [
                {
                    "name": "Kartik",
                    "phone": "12345678899",
                    "email": "kartikeyamishra2@gmail.com"
                }
            ];
            dbCallStub.onCall(0).returns(resp);
            let result = await usersDao.findAll();
            console.log("result====>", result);
            expect(dbCallStub.firstCall.returnValue).equal(result);
        })
    })

    describe('trying to stub database result /POST user', () => {
        it('add new user', async () => {
            let user = {
                "name": "Kartik",
                "phone": "12345678899",
                "email": "kartikeyamishra2@gmail.com"
            };
            dbCallStub.onCall(0).returns(1);
            let result = await usersDao.create(user);
            console.log("result====>", result);
            expect(dbCallStub.firstCall.returnValue).equal(1);
        })
    })

    // describe('/GET users', () => {
    //     it('it should Get all users', (done) => {
    //         chai.request(app)
    //         .get('/dishes/api/v1/user')
    //         .end((err, res) => {
    //             console.log("status", res.body);
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             done();
    //         });
    //     });
    // })
    
    // describe('/POST user', () => {
    //     it('it should Create new user', (done) => {
    //         let user = {
    //             name: "Test",
    //             phone: "1234567890",
    //             email: "test@gmail.com"
    //         }
    //         chai.request(app)
    //         .post('/dishes/api/v1/user')
    //         .send(user)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('data');
    //             res.body.should.have.property('message');
    //             res.body.should.have.property('statusCode').eq(200);
    //             done();
    //         })
    //     })
    // })
    
})


