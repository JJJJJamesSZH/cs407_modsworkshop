require('babel-register');

const userLogin = require("../application/model/user_login");
const test_user1 = {
    email: 'test_user1@purdue.edu',
    username: 'test_user1_cs407',
    password: 'password1'
}

// test case with duplicate email
const test_user1e = {
    email: 'test_user1@purdue.edu',
    username: 'test_user1e_cs407',
    password: 'password1'
}

// test case with duplicate username
const test_user1u = {
    email: 'test_user1u@purdue.edu',
    username: 'test_user1_cs407',
    password: 'password1'
}
const test_user2 = {
    email: 'test_user2@purdue.edu',
    username: 'test_user2_cs407',
    password: 'password2'
}
const test_user3 = {
    email: 'test_user3@purdue.edu',
    username: 'test_user3_cs407',
    password: 'password3'
}

let server = require("../app.js").listen(8000);
let request = require("supertest");
let assert = require("assert");

/**
 * unit tests for user_register.js
 * should check:
 *      1. delete existing test_user1, 2 and 3 profiles in user_login if existed.
 *      2. should add user1, 2, and 3 successfully.
 *      3. user1 shoud not be able to add agian
 *      4. user2 shoud not be able to add agian
 *      5. user3 shoud not be able to add agian
 *      6. delete user1, 2, and 3
 */

it('delete existing test_users', function(done) {
    setTimeout(function() {
        userLogin.deleteRow(test_user1);
        userLogin.deleteRow(test_user2);
        userLogin.deleteRow(test_user3);
    }, 0, 'funky');
    done();
});

it('add test_user1', function(done) {
    setTimeout(function() {
        request(server)
            .post('/modsworkshop/account/registration')
            .send(test_user1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
    }, 100, 'funky');
    done();
})

it('should not add test_user1u', function(done) {
    try {

        setTimeout(function() {
            request(server)
                .post('/modsworkshop/account/registration')
                .send(test_user1u)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(res) {
                    assert.equal(res.body.status, 201)
                })
        }, 400, 'funky');
        done();
    } catch (error) {
        console.log(error);
        assert.equal(error, undefined);
        done();
    }
})

it('should not add test_user1e', function(done) {
    try {

        setTimeout(function() {
            request(server)
                .post('/modsworkshop/account/registration')
                .send(test_user1e)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(res) {
                    assert.equal(res.body.status, 202)
                })
        }, 400, 'funky');
        done();
    } catch (error) {
        console.log(error);
        assert.equal(error, undefined);
        done();
    }
})

it('add test_user2', function(done) {
    setTimeout(function() {
        request(server)
            .post('/modsworkshop/account/registration')
            .send(test_user2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
    }, 100, 'funky');
    done();
})

it('add test_user3', function(done) {
    setTimeout(function() {
        request(server)
            .post('/modsworkshop/account/registration')
            .send(test_user3)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
    }, 100, 'funky');
    done();
})

it('delete remaining test_users', function(done) {
    setTimeout(function() {
        userLogin.deleteRow(test_user1);
        userLogin.deleteRow(test_user2);
        userLogin.deleteRow(test_user3);
    }, 800, 'funky');
    done();
});