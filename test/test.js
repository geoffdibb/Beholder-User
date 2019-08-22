var auditRequestLog = require('../routes/auditRequestLog');
var app = require('../server');
var md5 = require('../md5');
var expect = require('chai').expect;
var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('auditRequestLog', function () {

    //if info contains something, return info
    context('if info is passed in', function () {
        it('should return info', function (done) {
            // auditRequestLog('', function (err, info ) {
            //     if (err) return done(err);
            //     expect(info)
            //         .to.be.a('String')
            //         .that.matches('info')
            //         .add.equal('info');
            //     done();
            // })

chai.request(app).get('http://localhost:5001/getauditrequestlog/Bert').end((err, res) => {


expect(200,"ok");

done();

})


        })
    })

    // //if username===username send data
    // context('if username matches set username', function () {
    //     it('should send data', function (done) {
    //         auditRequestLog('', function (err, info ) {
    //             if (err) return done(err);
    //             expect(info)
    //                 .to.be.a()
    //                 .that.matches()
    //                 .add.equal();
    //             done();
    //         })
    //     })
    // })

    // //if username !=== username return 'cannot connect to api'
    // context('if username does not match', function () {
    //     it('should return message', function (done) {
    //         auditRequestLog('', function (err, info ) {
    //             if (err) return done(err);
    //             expect(info)
    //                 .to.be.a()
    //                 .that.matches()
    //                 .add.equal('cannot connect to api');
    //             done();
    //         })
    //     })
    // })

    // //else return 'username and jwt token do not match'
    // context('if username does not match', function () {
    //     it('should return message', function (done) {
    //         auditRequestLog('', function (err, info ) {
    //             if (err) return done(err);
    //             expect(info)
    //                 .to.be.a()
    //                 .that.matches()
    //                 .add.equal('username and jwt token do not match');
    //             done();
    //         })
    //     })
    // })

})

describe('#md5()', function () {

    context('with string argument', function () {
        it('should compute MD5 hash', function (done) {

            md5('Glad Chinda', function (err, hash) {
                // call the done() callback with the error if any
                // to terminate the test with an error
                if (err) return done(err);

                // add some assertions
                expect(hash)
                    .to.be.a('string')
                    .that.matches(/^[a-f0-9]{32}$/)
                    .and.equal('877dbb93f50eb8a89012e15bd37ee7e4');

                // finally call the done() callback
                // to terminate the test
                done();
            })

        })
    })

    context('with non-string argument', function () {
        it('should throw an error', function (done) {

            md5(12345, function (err, hash) {
                // call the done() callback with the error if any
                // to terminate the test
                if (err) {

                    // add an assertion to check the error
                    expect(function () { throw err })
                        .to.throw(TypeError, 'The "data" argument must be one of type string, TypedArray, or DataView. Received type number');

                    // finally call the done() callback
                    // to terminate the test and return
                    return done();

                }

                // call the done() callback
                // to terminate the test
                done();
            })

        })
    })

})