require('babel-register');

let server = require("../app.js").listen(8004);
let request = require("supertest");
let assert = require("assert");
let files = require('../application/model/files');

let files_db = require('../application/model/entity/files');
let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

let edit_test1 = {
    "email": "shao44@purdue.edu",
	"filename": "editfile1.txt",
    "type": "Visual Mods",
    "anonymous": true
	// "email" : "shao44@purdue.edu",
	// "filename": "testfile15.txt",
    // "type": "UI Mod",
    // "anonymous": true
}

let edit_test2 = {
    "email": "shao44@purdue.edu",
	"filename": "editfile2.txt",
    "type": "Visual Mods",
    "anonymous": true
	// "email" : "shao44@purdue.edu",
	// "filename": "testfile15.txt",
    // "type": "Function Mod",
    // "anonymous": true
}

let edit_test3 = {
    "email": "shao44@purdue.edu",
	"filename": "editfile3.txt",
    "type": "Visual Mods",
    "anonymous": true
	// "email" : "shao44@purdue.edu",
	// "filename": "testfile15.txt",
    // "type": "Game logic Mods",
    // "anonymous": true
}

it("Edit files success #1", function (done) {
    setTimeout(function() {
    request(server)
        .post('/modsworkshop/file/editFile')
        .send(edit_test1)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    }, 500, 'funky');
});

it("Edit files success #2", function (done) {
    setTimeout(function() {
    request(server)
        .post('/modsworkshop/file/editFile')
        .send(edit_test2)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    }, 500, 'funky');
});

it("Edit files success #3", function (done) {
    setTimeout(function() {
    request(server)
        .post('/modsworkshop/file/editFile')
        .send(edit_test3)
        .set('Authorization', auth)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    }, 500, 'funky');
});




