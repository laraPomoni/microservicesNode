var expect = require("chai").expect;
var chai = require('chai');
const config = require('config');
var streetsController = require("../../app/API-PUBBLICHE/controllers/streetsController.js");
let chaiHttp = require('chai-http');
let server = require('../../app/server.js');

chai.use(chaiHttp);

describe("[Couchbase VASP] VASP streets controller", function(){
    describe("[Couchbase VASP] Get street by ID", function() {
        it("returns status 200", function(done) {
            chai.request(server)
              .get('/api/street')
              .end((err, res) => {
                  if(err) console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
              });
        });
    });

    describe("[Couchbase VASP] Insert a new street", function() {
        it("returns status 200", function(done) {
            chai.request(server)
              .get('/api/street/:id')
              .end((err, res) => {
                  if(err) console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
              });
        });
    });
});