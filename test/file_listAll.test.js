require('babel-register');

let server = require("../app.js").listen(8003);
let request = require("supertest");
let assert = require("assert");



let files_db = require('../application/model/entity/files');
let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

// list all without email
it("testing for list all files", function(done) {
    setTimeout(function() {
        let test_case = {
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 0, 'funky');
})

// list all with email
it("testing for list all files", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 50, 'funky');
})

it("testing for list all files", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "testUser1@purdue.edu"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 100, 'funky');
})

// list file detail with email and filename
it("testing for list file detail with email and filename", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            filename: "testfile.txt"
        }
        request(server)
            .post('/modsworkshop/file/fileDetail')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.fileID, 56);
                assert.equal(res.body.email, "shao44@purdue.edu");
                assert.equal(res.body.fileName, "testfile.txt");
                assert.equal(res.body.key, "shao44@purdue.edu|testfile.txt");
            })
            .end(done)
    }, 150, 'funky');
})

// list file detail with key
it("testing for list file detail with key", function(done) {
    setTimeout(function() {
        let test_case = {
            key: "shao44@purdue.edu|testfile.txt"
        }
        request(server)
            .post('/modsworkshop/file/fileDetail')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.fileID, 56);
                assert.equal(res.body.email, "shao44@purdue.edu");
                assert.equal(res.body.fileName, "testfile.txt");
                assert.equal(res.body.key, "shao44@purdue.edu|testfile.txt");
            })
            .end(done)
    }, 200, 'funky');
})