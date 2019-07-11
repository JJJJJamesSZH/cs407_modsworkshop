// require('babel-register');

// const user_login = require('../application/model/user_login');
// let server = require("../app.js").listen(8002);
// let request = require("supertest");
// let assert = require("assert");

// const correct_combo = {
//     email: 'shao44@purdue.edu',
//     password: 'ShaoZH0923?'
// }

// const wrong_pswd1 = {
//     email: 'shao44@purdue.edu',
//     password: 'ShaoZH0923!'
// }

// const wrong_pswd2 = {
//     email: 'shao44@purdue.edu',
//     password: 'SHAOZH0923?'
// }

// const wrong_pswd3 = {
//     email: 'shao44@purdue.edu',
//     password: 'shaoziheng0923?'
// }

// const wrong_email1 = {
//     email: 'shao45@purdue.edu',
//     password: '12345678'
// }

// const wrong_email2 = {
//     email: 'johnPurdue@purdue.edu',
//     password: 'boilerup'
// }

// const wrong_email3 = {
//     email: 'DrewBrees@purdue.edu',
//     password: 'neworleans'
// }

// // test 1, login with correct credential
// it('login with correct credential', function(done) {
//     setTimeout(function() {
//         request(server)
//             .post('/modsworkshop/account/login')
//             .send(correct_combo)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 200);
//             })
//             .end(done)
//     }, 50, 'funky');
// })

// // test 2, login with wrong password
// it('login with wrong password', function(done) {
//     setTimeout(function() {
//         request(server)
//             .post('/modsworkshop/account/login')
//             .send(wrong_pswd1)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 202);
//             })
//             .end(done)
//     }, 100, 'funky');
// })

// // test 3, login with wrong password
// it('login with wrong password', function(done) {
//     setTimeout(function() {
//         request(server)
//             .post('/modsworkshop/account/login')
//             .send(wrong_pswd2)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 202);
//             })
//             .end(done)
//     }, 150, 'funky');
// })

// // test 4, login with wrong password
// it('login with wrong password', function(done) {
//     setTimeout(function() {
//         request(server)
//             .post('/modsworkshop/account/login')
//             .send(wrong_pswd3)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 202);
//             })
//             .end(done)
//     }, 200, 'funky');
// })

// // test 5, login with non-existing email
// it('login with non-existing email', function(done) {
//     setTimeout(function() {
//         request(server)
//             .post('/modsworkshop/account/login')
//             .send(wrong_email1)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 201);
//             })
//             .end(done)
//     }, 250, 'funky');
// })

// // test 6, login with non-existing email
// it('login with non-existing email', function(done) {
//     setTimeout(function() {
//         request(server)
//             .post('/modsworkshop/account/login')
//             .send(wrong_email2)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 201);
//             })
//             .end(done)
//     }, 300, 'funky');
// })

// // test 7, login with non-existing email
// it('login with non-existing email', function(done) {
//     setTimeout(function() {
//         request(server)
//             .post('/modsworkshop/account/login')
//             .send(wrong_email3)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 201);
//             })
//             .end(done)
//     }, 350, 'funky');
// })