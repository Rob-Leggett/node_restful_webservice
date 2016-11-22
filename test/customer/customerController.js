const assert = require('assert');
const sinon = require('sinon');

const customerController = require('../../app/customer/customerController');

describe('Customer Controller', () => {
  describe('get', () => {
    const resStub = {};

    beforeEach(() => {
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);
    });

    it('should return 200 successful', () => {
      const req = {};

      customerController.get(req, resStub);

      assert(resStub.status.calledWith(200));
      assert(resStub.json.calledWith({}));
    });
  });
});