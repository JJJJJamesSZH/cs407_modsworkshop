require('babel-register');

let server = require("../app.js").listen(8010);
let request = require("supertest");
let assert = require("assert");

let comment_list = require("../application/model/comment_list");

let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"
let key = "shao44@purdue.edu|testfile1.txt";

// testing: add comment
it("testing: add comment", function(done) {
    this.timeout(3000);
    let comment_msg = "testing comment " + Date.now();
    setTimeout(function() {
        let test_case = {
            key: "shao44@purdue.edu|testfile1.txt",
            comment: comment_msg
        };
        request(server)
            .post('/modsworkshop/comment/addComment')
            .send(test_case)
            .set('Authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(async function(res) {
                let list = await comment_list.find({
                    where: {
                        file_id: 63,
                        email: "shao44@purdue.edu"
                    }
                })

                let t = false;
                let n = list.length;

                for (let i = 0; i < n; i++){
                    let comment = list[i].dataValues.comment;
                    if (comment === comment_msg){
                        t = true;
                        i = n;
                    }
                }

                assert.equal(t, true);
            })
            .end(done)
    }, 10, 'funky');
})

// testing: view comment /modsworkshop/comment/showComment
it("testing: view comment", function(done){
    this.timeout(3000);
    setTimeout(function() {
        let test_case = {
            key: key
        }
        request(server)
            .post('/modsworkshop/comment/showComment')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                let body = res.body;
                let comments = body.comments;
                assert.notEqual(comments, undefined);
                assert.notEqual(comments, null);
                let n = comments.length;
                assert.notEqual(n, undefined);
                assert.notEqual(n, null);
                assert.notEqual(0);
            })
            .end(done)
    }, 20, 'funky');
})

// testing: should contain username of the comment author
it("testing: view comment", function(done){
    this.timeout(3000);
    setTimeout(function() {
        let test_case = {
            key: key
        }
        request(server)
            .post('/modsworkshop/comment/showComment')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                let body = res.body;
                let comments = body.comments;
                assert.notEqual(comments, undefined);
                assert.notEqual(comments, null);
                let n = comments.length;
                assert.notEqual(n, undefined);
                assert.notEqual(n, null);
                assert.notEqual(0);
                
                for (let i = 0; i < n; i++){
                    let cmt = comments[i];
                    let username = cmt.username;
                    assert.notEqual(username, undefined);
                    assert.notEqual(username, null);
                }
            })
            .end(done)
    }, 20, 'funky');
})