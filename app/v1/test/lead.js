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
const LeadsDao = require("../database/queries/lead");
var leadsDao = new LeadsDao(db);

chai.use(chaiHttp);

describe('Test lead generation unit test cases', () => {

    let dbCallStub;
    beforeEach(() => {
        dbCallStub = sinon.stub(db, 'query');
    })
    afterEach(() => {
        dbCallStub.restore();
    })

    describe('trying to stub database result /GET lead', () => {
        it('find all leads for a user', async () => {
            let resp = [
                {
                    "lead_created_by": 1,
                    "name": "Abc",
                    "phone": "9720202020",
                    "email": "abcd@gmail.com",
                    "address": "118/529",
                    "status": "NEW",
                    "rewards": 0
                }
            ];
            dbCallStub.onCall(0).returns(resp);
            let result = await leadsDao.findAll();
            // console.log("result====>", result);
            expect(dbCallStub.firstCall.returnValue).equal(result);
        })
    })

    describe('trying to stub database result /POST lead', () => {
        it('add new lead', async () => {
            let lead = {
                "userId": "1",
                "name": "Abc",
                "email": "abcd@gmail.com",
                "phone": "9720202020",
                "address": "Kanpur"
            }
            dbCallStub.onCall(0).returns(1);
            let result = await leadsDao.create(lead);
            // console.log("result====>", result);
            expect(dbCallStub.firstCall.returnValue).equal(1);
        })
    })
    
})


