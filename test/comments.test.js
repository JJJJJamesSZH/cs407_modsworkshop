require('babel-register');

let server = require("../app.js").listen(8010);
let request = require("supertest");
let assert = require("assert");

let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

// testing: add comment
it("testing: add comment", function(done) {
    this.timeout(3000);
    setTimeout(function() {
        let test_case = {
            key: "shao44@purdue.edu|testfile1.txt",
            comment: "Testing comment 1"
        };
        request(server)
            .post('/modsworkshop/comment/addComment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(async function(res) {
                
            })
    })
})