require('babel-register');

let server = require("../app.js").listen(8007);
let request = require("supertest");
let assert = require("assert");
let files = require('../application/model/files');

let files_db = require('../application/model/entity/files');
let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"



// let addfavorite = {
//     email: "shao44@purdue.edu",
//     key: "shao44@purdue.edu|deletetest2.txt"
// }

it("init upload 1", function(done) {
    let test_file1 = {
        filename: "deletetest1.txt",
        type: "UI Mod",
        anonymous: false
    }

    request(server)
        .post('/modsworkshop/file/getUploadURL')
        .send(test_file1)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .end(done);
})

it("init upload 2", function(done) {
    let test_file2 = {
        filename: "deletetest2.txt",
        type: "UI Mod",
        anonymous: false
    }

    request(server)
        .post('/modsworkshop/file/getUploadURL')
        .send(test_file2)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .end(done)
})

it("init upload 3", function(done) {
    let test_file3 = {
        filename: "deletetest3.txt",
        type: "UI Mod",
        anonymous: false
    }

    request(server)
        .post('/modsworkshop/file/getUploadURL')
        .send(test_file3)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .end(done)
})


it("delete files success #1", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            key: "shao44@purdue.edu|deletetest1.txt"
        }
        request(server)
            .post('/modsworkshop/file/deletefile')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect(200)
            .end(done)
    }, 500, 'funky');
});

it("delete files success #2", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            key: "shao44@purdue.edu|deletetest2.txt"
        }
        request(server)
            .post('/modsworkshop/file/deletefile')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done)
    }, 500, 'funky');
})

it("testing for false authorization", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            key: "shao44@purdue.edu|deletetest3.txt"
        }
        request(server)
            .post('/modsworkshop/file/deleteFile')
            .send(test_case)
            .set('Authorization', "this_is_a_fake_auth")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 500);
            })

        .end(done)
    }, 150, 'funky');
});

console.log("Finished false authorization test");