let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist/index');
let should = chai.should();
let mongoose = require("mongoose");
let postModel = require('../dist/models/postsModel');
let assert = chai.assert;
let request = require('supertest');
chai.use(chaiHttp);


describe('Books', () => {
  /*
  * Test the /GET route
  */
  describe('/ GET', () => {
    it('it should tur', (done) => {
      request(server).get('/').expect(200, done);
    });
  });
  describe('/water GET', () => {
    it('it should GET all the pics', (done) => {
      request(server).get('/water').expect(200, done);
    });
  });
});
