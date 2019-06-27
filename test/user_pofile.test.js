require('babel-register');

const user_profile = require('../application/model/user_profile');
let server = require("../app.js").listen(8002);
let request = require("supertest");
let assert = require("assert");

/**
 * unit tests for user_profile.js
 * should check:
 *      1. view profile all function
 *      2. view profile username, description, icon, 
 *         and upload file list seperately
 *      3. edit all profile except user email and upload list
 *      4. edit profile username, description, icon seperately
 */

const profile1_send = {
	"email":"viewprofileTest1@gmail.com"
}

const profile2_send_username = {
	"email":"viewprofileTest2@gmail.com"
}

const profile3_send_description = {
	"email":"viewprofileTest3@gmail.com"
}

const profile3_send_icon = {
	"email":"viewprofileTest3@gmail.com"
}

const profile3_send_uploadfile = {
	"email":"viewprofileTest3@gmail.com"
}


const correct_profile1 = {
    "status": 200,
    "username": "viewPT1",
    "email": "viewprofileTest1@gmail.com",
    "description": "description1",
    "icon": 0,
    "files": [
        31
    ]
}

const correct_profile2= {
    "status": 200,
    "username": "viewPT2",
}

const correct_profile3 = {
    "status": 200,
    "description": "description3",
}

const correct_profile3_icon = {
    "status": 200,
    "icon": "2",
}

const correct_profile3_files = {
    "status": 200,
    "files": [
        32
    ]
}





it('get correct all profile information', function(done) {
    setTimeout(function() {
        console.log("============================================");
        console.log("=========== Start profile test =============");
        console.log("============================================");
        console.log("============== Test viewAll =================");
        request(server)
            .post('/modsworkshop/profile/viewAll')
            .send(profile1_send)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            // .expect(function(res) {
            //     assert.equal(res.body.status, 200);
            //     assert.equal(res.body.username, "viewPT1");
            //     assert.equal(res.body.description, "viewprofileTest1@gmail.com");
            //     assert.equal(res.body.icon, 0);
            //     assert.equal(res.body.files, [31]);
            // })
            .end(done)
    }, 50, 'funky');
})


it('get correct profile username', function(done) {
    setTimeout(function() {
        console.log("============== Test username ==============");
        request(server)
            .post('/modsworkshop/profile/viewUsername')
            .send(profile2_send_username)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, correct_profile2.status);
                assert.equal(res.body.username, correct_profile2.username);
            })
            .end(done)
    }, 50, 'funky');
})



it('get correct profile description', function(done) {
    setTimeout(function() {
        console.log("============ Test description ===============");
        request(server)
            .post('/modsworkshop/profile/viewDescription')
            .send(profile3_send_description)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, correct_profile3.status);
                assert.equal(res.body.description, correct_profile3.description);
            })
            .end(done)
    }, 50, 'funky');
})


it('get correct profile icon', function(done) {
    setTimeout(function() {
        console.log("============== Test icon =================");
        request(server)
            .post('/modsworkshop/profile/viewIcon')
            .send(profile3_send_icon)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, correct_profile3_icon.status);
                assert.equal(res.body.icon, correct_profile3_icon.icon);
            })
            .end(done)
    }, 50, 'funky');
})


it('get correct profile uploadfile list', function(done) {
    setTimeout(function() {
        console.log("============== Test uploadfile =================");
        request(server)
            .post('/modsworkshop/profile/viewUploadfile')
            .send(profile3_send_uploadfile)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            // .expect(function(res) {
            //     assert.equal(res.body.status, 200);
            //     assert.equal(res.body.files, [32]);
            // })
            .end(done)
    }, 50, 'funky');
})





    
