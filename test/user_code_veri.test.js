// require('babel-register');

// const email_code = require("../application/model/email_code");

// // testcase 1 - correct
// const code_veri_testU_1 = {
//     email: 'code_veri_testU@purdue.edu',
//     code: 'CODE1ABC',
//     password: 'ShaoZH0923?'
// };

// // testcase 2 - wrong code
// const code_veri_testU_2 = {
//     email: 'code_veri_testU@purdue.edu',
//     code: 'CODE2ABC',
//     password: 'ShaoZH0923?'
// };

// // testcase 3 - wrong email
// const code_veri_testU_3 = {
//     email: 'code_veri_testttt@purdue.edu',
//     code: 'CODE1ABC',
//     password: 'ShaoZH0923?'
// };

// let server = require("../app.js").listen(8001);
// let request = require("supertest");
// let assert = require("assert");

// /**
//  * unit tests for user_code_veri.js
//  * should check:
//  * 1. correct email-code combination
//  * 2. correct email with incorrect verification code
//  * 3. email which does not exist
//  */

// // test 0 database init
// it('database init', function(done) {
//     const code_veri_std = {
//         email: 'code_veri_testU@purdue.edu',
//         code: 'CODE1ABC'
//     };

//     email_code.updateCode(code_veri_std);
//     done();
// })

// // test 1 correct combi
// it('checking with correct email-code combination', function(done) {
//     // Correct email/code combination
//     setTimeout(function() {
//         console.log("===================== test1 ===================");

//         request(server)
//             .post('/modsworkshop/account/codeVeri')
//             .send(code_veri_testU_1)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 200);
//             })
//             .end(done)
//     }, 100, 'funky');
// })

// // test 2 incorrect code
// it('checking with incorrect code', function(done) {
//     // Correct email/code combination
//     setTimeout(function() {
//         console.log("===================== test2 ===================");

//         request(server)
//             .post('/modsworkshop/account/codeVeri')
//             .send(code_veri_testU_2)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 202)
//             })
//             .end(done)
//     }, 200, 'funky');
// })

// // test 3 email does not exist
// it('checking with email which does not exist', function(done) {
//     // Correct email/code combination
//     setTimeout(function() {
//         console.log("===================== test3 ===================");

//         request(server)
//             .post('/modsworkshop/account/codeVeri')
//             .send(code_veri_testU_3)
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//                 assert.equal(res.body.status, 201)
//             })
//             .end(done)
//     }, 300, 'funky');
// })