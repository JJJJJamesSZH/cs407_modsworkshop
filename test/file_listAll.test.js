require('babel-register');

let server = require("../app.js").listen(8003);
let request = require("supertest");
let assert = require("assert");



let files_db = require('../application/model/entity/files');
let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYW80NEBwdXJkdWUuZWR1IiwiaWF0IjoxNTYxNDMzMzM2fQ.OiYdyHEMFzMBTBUpCkxev8_sbuUW9vsl9JqJqLyhty0"

// list all without email
it("testing for list all files", function(done) {
    this.timeout(4000);
    setTimeout(function() {
        let test_case = {}
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 10, 'funky');
})

// list all with email
it("testing for list all files", function(done) {
    this.timeout(4000);
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 50, 'funky');
})

it("testing for list all files", function(done) {
    this.timeout(4000);
    setTimeout(function() {
        let test_case = {
            email: "testUser1@purdue.edu"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 100, 'funky');
})

// list file detail with email and filename
it("testing for list file detail with email and filename", function(done) {
    this.timeout(4000);
    setTimeout(function() {
        let test_case = {
            email: "shao44@purdue.edu",
            filename: "testfile.txt"
        }
        request(server)
            .post('/modsworkshop/file/fileDetail')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.fileID, 56);
                assert.equal(res.body.email, "shao44@purdue.edu");
                assert.equal(res.body.fileName, "testfile.txt");
                assert.equal(res.body.key, "shao44@purdue.edu|testfile.txt");
            })
            .end(done)
    }, 150, 'funky');
})

// list file detail with key
it("testing for list file detail with key", function(done) {
    this.timeout(4000);
    setTimeout(function() {
        let test_case = {
            key: "shao44@purdue.edu|testfile.txt"
        }
        request(server)
            .post('/modsworkshop/file/fileDetail')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.fileID, 56);
                assert.equal(res.body.email, "shao44@purdue.edu");
                assert.equal(res.body.fileName, "testfile.txt");
                assert.equal(res.body.key, "shao44@purdue.edu|testfile.txt");
            })
            .end(done)
    }, 200, 'funky');
})

// list file detail with search Keywords
it("testinf for list file detail by keyword = null", function(done) {
    this.timeout(5000);
    setTimeout(function() {
        let test_case = {
            searchKeyword: null
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 250, 'funky')
})

// list file detail with search Keywords
it("testinf for list file detail by keyword = testfile", function(done) {
    this.timeout(5000);
    setTimeout(function() {
        let test_case = {
            searchKeyword: "testfile"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 300, 'funky')
})

// list file detail by contributor's name
it("testinf for list file detail by contributor's name null false", function(done) {
    this.timeout(5000);
    setTimeout(function() {
        let test_case = {
            searchKeyword: null,
            searchByContributor: false
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 350, 'funky')
})

// list file detail by contributor's name
it("testinf for list file detail by contributor's name null true", function(done) {
    this.timeout(5000);
    setTimeout(function() {
        let test_case = {
            searchKeyword: null,
            searchByContributor: true
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 400, 'funky')
})

// list file detail by contributor's name
it("testinf for list file detail by contributor's name true", function(done) {
    this.timeout(5000);
    setTimeout(function() {
        let test_case = {
            searchKeyword: "editPT8",
            searchByContributor: true
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 450, 'funky')
})

// sort the files listed by time
// sort time descend by default
it("sort the files listed by time null", function(done) {
    this.timeout(5000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: null
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 500, 'funky')
})

// sort the files listed by time
it("sort the files listed by time desc", function(done) {
    this.timeout(5000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "timeDESC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 550, 'funky')
})

// sort the files listed by time
it("sort the files listed by time desc", function(done) {
    this.timeout(6000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "timeDESC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 600, 'funky')
})

// sort the files listed by time
it("sort the files listed by time ASC", function(done) {
    this.timeout(6000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "timeASC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 600, 'funky')
})

// sort the files by filename
it("sort the files listed by name ASC", function(done) {
    this.timeout(6000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "nameASC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 650, 'funky')
})

// sort the files by filename
it("sort the files listed by name DESC", function(done) {
    this.timeout(6000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "nameDESC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 700, 'funky')
})

// sort the files by number of downloads
it("sort the files listed by downloads ASC", function(done) {
    this.timeout(6000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "downloadsASC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 750, 'funky')
})

// sort the files by number of downloads
it("sort the files listed by downloads DESC", function(done) {
    this.timeout(6000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "downloadsDESC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 800, 'funky')
})

// sort the files by number of likes
it("sort the files listed by likes ASC", function(done) {
    this.timeout(6000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "likesASC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 850, 'funky')
})

// sort the files by number of likes
it("sort the files listed by likes DESC", function(done) {
    this.timeout(6000);
    setTimeout(function() {
        let test_case = {
            sortingMethod: "likesDESC"
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 900, 'funky')
})

// filter the files by types
it("filter the files by type null", function(done) {
    this.timeout(7000);
    setTimeout(function() {
        let test_case = {
            filterType: null
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 950, 'funky')
})

// filter the files by types
it("filter the files by type empty", function(done) {
    this.timeout(7000);
    setTimeout(function() {
        let test_case = {
            filterType: {
                content: []
            }
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 1000, 'funky')
})

// filter the files by types
it("filter the files by type single type", function(done) {
    this.timeout(7000);
    setTimeout(function() {
        let test_case = {
            filterType: {
                content: ["UI Mods"]
            }
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 1050, 'funky')
})

// filter the files by types
it("filter the files by type multiple types", function(done) {
    this.timeout(7000);
    setTimeout(function() {
        let test_case = {
            filterType: {
                content: ["UI Mods", "Visual Mods"]
            }
        }
        request(server)
            .post('/modsworkshop/file/listAll')
            .send(test_case)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.status, 200)
            })
            .end(done)
    }, 1050, 'funky')
})