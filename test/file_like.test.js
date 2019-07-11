require('babel-register');

let server = require("../app.js").listen(8004);
let request = require("supertest");
let assert = require("assert");
let files = require('../application/model/files');

let files_db = require('../application/model/entity/files');
let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

// Test on success like #1
it("Like files success #1", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu",
        key: "shao44@purdue.edu|likefile1.txt"
    }
    request(server)
        .post('/modsworkshop/file/likefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    }, 500, 'funky');
});

// Test on success like #2
it("Like files success #2", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu",
        key: "shao44@purdue.edu|likefile2.txt"
    }
    request(server)
        .post('/modsworkshop/file/likefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    }, 500, 'funky');
});

// Test on success like #3
it("Like files success #3", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu",
        key: "shao44@purdue.edu|likefile3.txt"
    }
    request(server)
        .post('/modsworkshop/file/likefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    }, 500, 'funky');
});

// Test on success unlike #1
it("unlike files success #1", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu",
        key: "shao44@purdue.edu|likefile1.txt"
    }
    request(server)
        .post('/modsworkshop/file/unlikefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    }, 500, 'funky');
});

// Test on success unlike #2
it("unlike files success #2", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu",
        key: "shao44@purdue.edu|likefile2.txt"
    }
    request(server)
        .post('/modsworkshop/file/unlikefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    }, 500, 'funky');
});

// Test on failed unlike #1, file has not been liked
it("unlike files failed #1", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu",
        key: "shao44@purdue.edu|likefile1.txt"
    }
    request(server)
        .post('/modsworkshop/file/unlikefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .expect(200)
        .expect(function(res){
            assert.equal(res.body.status,207)
        })
        .end(done)
    }, 500, 'funky');
});

// Test on failed unlike, cannot get file key
it("unlike files failed #2", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu"
    }
    request(server)
        .post('/modsworkshop/file/unlikefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .expect(204)
        .expect(function(res){
            assert.equal(res.body.status, 204)
        })
        .end(done)
    }, 500, 'funky');
});

// Test on failed like, file has been liked
it("like files failed #1", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu",
        key: "shao44@purdue.edu|likefile3.txt"
    }
    request(server)
        .post('/modsworkshop/file/likefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .expect(200)
        .expect(function(res){
            assert.equal(res.body.status, 206)
        })
        .end(done)
    }, 500, 'funky');
});

// Test on failed like, cannot get file key
it("like files failed #2", function (done) {
    setTimeout(function() {
    let test_case = {
        email: "shao44@purdue.edu"
    }
    request(server)
        .post('/modsworkshop/file/likefile')
        .send(test_case)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .expect(204)
        .expect(function(res){
            assert.equal(res.body.status, 204)
        })
        .end(done)
    }, 500, 'funky');
});
