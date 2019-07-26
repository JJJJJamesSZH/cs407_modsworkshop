require('babel-register');

let server = require("../app.js").listen(8008);
let request = require("supertest");
let assert = require("assert");

let files_db = require('../application/model/entity/files');
let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

// testing by requiring multiple URLs
// upload URL
it("testing upload files overwrite", function(done) {
    setTimeout(function() {
        let test_case = {
            filename: "testfile1.txt",
            type: "UI Mod",
            anonymous: false
        }
        request(server)
            .post('/modsworkshop/file/getUploadURL')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 0, 'funky');
})

it("testing upload files success #2", function(done) {
    setTimeout(function() {
        let test_case = {
            filename: "testfile2.txt",
            type: "Function Mod",
            anonymous: false
        }
        request(server)
            .post('/modsworkshop/file/getUploadURL')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 50, 'funky');
})

it("testing upload files success #3", function(done) {
    setTimeout(function() {
        let test_case = {
            filename: "testfile3.txt",
            type: "User saves",
            anonymous: false
        }
        request(server)
            .post('/modsworkshop/file/getUploadURL')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 100, 'funky');
})

it("testing for false authorization", function(done) {
    setTimeout(function() {
        let test_case = {
            filename: "testfile4.txt",
            type: "User saves",
            anonymous: false
        }
        request(server)
            .post('/modsworkshop/file/getUploadURL')
            .send(test_case)
            .set('Authorization', "this_is_a_fake_auth")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done)
    }, 150, 'funky');
})

// download URL

it("testing download file success #1", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            filename: "testfile1.txt"
        }

        request(server)
            .post('/modsworkshop/file/getDownloadURL')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done)
    }, 200, 'funky')
})

it("testing download file success #2", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            filename: "testfile2.txt"
        }

        request(server)
            .post('/modsworkshop/file/getDownloadURL')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done)
    }, 200, 'funky')
})

it("testing download file success #3", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            filename: "testfile3.txt"
        }

        request(server)
            .post('/modsworkshop/file/getDownloadURL')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done)
    }, 200, 'funky')
})