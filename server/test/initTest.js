var chai = require('chai');
var assert = chai.assert;

describe('first tests', function() {
  it('should pass', function() {
    var element = { className: '' };
    assert.equal(element.className, '');
  });
});
