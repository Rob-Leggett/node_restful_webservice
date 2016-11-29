const proxyquire = require('proxyquire');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Customer Controller', () => {

  describe('getCustomer', () => {
    let queryCustomerPromise, customerController;
    let resStub;
    const queryCustomerStub = {};

    const customerStub = { firstName: "Test", lastName: "User" };

    beforeEach(() => {
      resStub = {};
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);

      queryCustomerPromise = new Promise((resolve) => {
        resolve(customerStub);
      });

      queryCustomerStub.getById = sinon.stub().returns(queryCustomerPromise);

      customerController = proxyquire('../../app/customer/customerController', {
        '../user/db/query/queryCustomer': queryCustomerStub
      });
    });

    it('should call query customer successful', () => {
      const req = {
        params: {
          id: 123456789
        }
      };

      customerController.getCustomer(req, resStub);

      expect(queryCustomerStub.getById.calledWith(req.params.id)).to.equal(true);
    });

    it('should return 200 successful', () => {
      const req = {
        params: {
          id: 123456789
        }
      };


      customerController.getCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.status.calledWith(200)).to.equal(true);
      });
    });

    it('should return customer successful', () => {
      const req = {
        params: {
          id: 123456789
        }
      };

      customerController.getCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.json.calledWith(customerStub)).to.equal(true);
      })
    });
  });
});