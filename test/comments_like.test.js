require('babel-register');

let server = require("../app.js").listen(8011);
let request = require("supertest");
let assert = require("assert");


let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

it("Like comment success #1", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 21
        }
        request(server)
            .post('/modsworkshop/comment/likecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 500, 'funky');
});

it("Like comment failed #1 has been liked", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 21
        }
        request(server)
            .post('/modsworkshop/comment/likecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 206)
            })
            .end(done)
    }, 500, 'funky');
});

it("Disike comment success #1", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 22
        }
        request(server)
            .post('/modsworkshop/comment/dislikecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 500, 'funky');
});

it("Like comment failed #2 has been disliked", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 22
        }
        request(server)
            .post('/modsworkshop/comment/likecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 208)
            })
            .end(done)
    }, 500, 'funky');
});

it("Disike comment failed #1 has been disliked", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 22
        }
        request(server)
            .post('/modsworkshop/comment/dislikecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                assert.equal(res.body.status, 206)
            })
            .expect(200)
            .end(done)
    }, 500, 'funky');
});

it("Disike comment failed #2 has been liked", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 21
        }
        request(server)
            .post('/modsworkshop/comment/dislikecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 208)
            })
            .end(done)
    }, 500, 'funky');
});


it("Like comment success #2", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 23
        }
        request(server)
            .post('/modsworkshop/comment/likecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 500, 'funky');
});

it("unlike comment success", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 23
        }
        request(server)
            .post('/modsworkshop/comment/unlikecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 500, 'funky');
});

it("unlike comment failed # has not been liked", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 23
        }
        request(server)
            .post('/modsworkshop/comment/unlikecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 207)
            })
            .end(done)
    }, 500, 'funky');
});

it("Dislike comment success #2", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 24
        }
        request(server)
            .post('/modsworkshop/comment/dislikecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 500, 'funky');
});

it("unlike comment success", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 24
        }
        request(server)
            .post('/modsworkshop/comment/undislikecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 500, 'funky');
});

it("unlike comment failed # has not been liked", function(done) {
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            comment_id: 24
        }
        request(server)
            .post('/modsworkshop/comment/undislikecomment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 207)
            })
            .end(done)
    }, 500, 'funky');
});