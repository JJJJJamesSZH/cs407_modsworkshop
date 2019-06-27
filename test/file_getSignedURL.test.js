require('babel-register');

let server = require("../app.js").listen(8002);
let request = require("supertest");
let assert = require("assert");

let files_entity = require('../application/model/entity/files');