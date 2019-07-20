require('babel-register');

let server = require("../app.js").listen(8003);
let request = require("supertest");
let assert = require("assert");

let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

// testing: get the rate in listAll
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