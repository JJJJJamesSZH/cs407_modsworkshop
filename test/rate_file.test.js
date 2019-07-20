require('babel-register');

let server = require("../app.js").listen(8009);
let request = require("supertest");
let assert = require("assert");

let rate_db = require("../application/model/user_rates");
// import { rate_db } from "../application/model/entity/user_rates";

let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

// testing: get the rate in file listAll
it("testing: get rate in list all", function(done) {
    this.timeout(3000);
    setTimeout(function() {
        let test_case = {}
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                let body = res.body;
                let file_list = body.file_list;
                let n = file_list.length;
                for (let i = 0; i < n; i++){
                    let rate = file_list[i].rate;
                    assert.notEqual(rate, undefined);
                    assert.notEqual(rate, null);
                }
            })
            .end(done)
    }, 10, 'funky');
})

// testing: get the rate in fileDetail
it("testing: get rate in fileDetail", function(done) {
    this.timeout(3000);
    setTimeout(function() {
        let test_case = {
            key: "shao44@purdue.edu|testfile1.txt"
        }
        request(server)
            .post('/modsworkshop/file/fileDetail')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                let body = res.body;
                let rate = body.rate;
                assert.notEqual(rate, undefined);
                assert.notEqual(rate, null);
            })
            .end(done)
    }, 20, 'funky');
})

// testing: rate the file
it("testing: rate the file", function(done) {
    this.timeout(3000);
    setTimeout(function() {
        let test_case = {
            "email":"shao44@purdue.edu",
	        "key":"shao44@purdue.edu|testfile1.txt",
	        "rate":5
        }
        request(server)
            .post('/modsworkshop/rates/rateFile')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(async function(res) {
                let list = await rate_db.find({
                    where: {
                        email: "shao44@purdue.edu",
                        file_id: 63
                    }
                });
                let rate = list[0].dataValues.rate;
                assert.equal(rate, 5);
            })
            .end(done)
    }, 30, 'funky');
})