var ami = require('../ami');
var assert = require("assert");

describe('test ami', function() {
    it('should have 2 properties', function(done) {
        ami([{
            init: function(context, next) {
                context.name = 'hello';
                (function() {
                    next();
                })();
            }
        }, {
            init: function(context, next) {
                context.tag = 'world';
                next();
            }
        }], function(context) {
            assert.equal(context.name, 'hello');
            assert.equal(context.tag, 'world');
            done();
        });
    });

    it('jump to main function when no module is present', function() {
        ami([], function(context) {
            assert.deepEqual(context, {});
        });
    });

    it('passing invalid modules throws an error', function() {
        assert.throws(function() {
            ami({}, function() {});
        }, Error);
    });

    it('passing invalid mainFunc throws an error', function() {
        assert.throws(function() {
            ami([], {});
        }, Error);
    });

    it('passing module witout init() throws an error', function() {
        assert.throws(function() {
            ami([
                    {
                        nop: function(){}
                    }
                ], function(){});
        }, Error);
    });
});
