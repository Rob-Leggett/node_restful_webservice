const proxyquire = require('proxyquire');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Customer Controller', () => {

  describe('getCustomer successfully', () => {
    let queryCustomerPromise, customerController;
    let resStub = {};
    const queryCustomerStub = {};

    const customerStub = { firstName: "Test", lastName: "User" };

    beforeEach(() => {
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

    it('should return 200 successful', (done) => {
      const req = {
        params: {
          id: 123456789
        }
      };

      customerController.getCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.status.calledWith(200)).to.equal(true);
      }).then(done, done);
    });

    it('should return customer successful', (done) => {
      const req = {
        params: {
          id: 123456789
        }
      };

      customerController.getCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.json.calledWith(customerStub)).to.equal(true);
      }).then(done, done);
    });
  });

  describe('getCustomers successfully', () => {
    let queryCustomerPromise, customerController;
    let resStub = {};
    const queryCustomerStub = {};

    const customersStub = [{ firstName: "Test", lastName: "User" }, { firstName: "User", lastName: "Test" }];

    beforeEach(() => {
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);

      queryCustomerPromise = new Promise((resolve) => {
        resolve(customersStub);
      });

      queryCustomerStub.get = sinon.stub().returns(queryCustomerPromise);

      customerController = proxyquire('../../app/customer/customerController', {
        '../user/db/query/queryCustomer': queryCustomerStub
      });
    });

    it('should call query customers successful', () => {
      const req = {};

      customerController.getCustomers(req, resStub);

      expect(queryCustomerStub.get.calledOnce).to.equal(true);
    });

    it('should return 200 successful', (done) => {
      const req = {};

      customerController.getCustomers(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.status.calledWith(200)).to.equal(true);
      }).then(done, done);
    });

    it('should return customers successful', (done) => {
      const req = {};
      const expected = { customers: customersStub };

      customerController.getCustomers(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.json.calledWith(expected)).to.equal(true);
      }).then(done, done);
    });
  });

  describe('saveCustomer successfully', () => {
    let queryCustomerPromise, customerController;
    let resStub = {};
    const queryCustomerStub = {};

    beforeEach(() => {
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);

      queryCustomerPromise = new Promise((resolve) => {
        resolve();
      });

      queryCustomerStub.save = sinon.stub().returns(queryCustomerPromise);

      customerController = proxyquire('../../app/customer/customerController', {
        '../user/db/query/queryCustomer': queryCustomerStub
      });
    });

    it('should call query customer successful', () => {
      const req = {
        body: {
          firstName: "Test",
          lastName: "User"
        }
      };

      customerController.saveCustomer(req, resStub);

      expect(queryCustomerStub.save.calledWith(req.body)).to.equal(true);
    });

    it('should return 200 successful', (done) => {
      const req = {
        body: {
          firstName: "Test",
          lastName: "User"
        }
      };

      customerController.saveCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.status.calledWith(200)).to.equal(true);
      }).then(done, done);
    });

    it('should save customer successful', (done) => {
      const req = {
        params: {
          id: 123456789
        },
        body: {
          firstName: "Test",
          lastName: "User"
        }
      };
      const expected = {};

      customerController.saveCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.json.calledWith(expected)).to.equal(true);
      }).then(done, done);
    });
  });

  describe('updateCustomer successfully', () => {
    let queryCustomerPromise, customerController;
    let resStub = {};
    const queryCustomerStub = {};

    beforeEach(() => {
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);

      queryCustomerPromise = new Promise((resolve) => {
        resolve();
      });

      queryCustomerStub.update = sinon.stub().returns(queryCustomerPromise);

      customerController = proxyquire('../../app/customer/customerController', {
        '../user/db/query/queryCustomer': queryCustomerStub
      });
    });

    it('should call query customer successful', () => {
      const req = {
        params: {
          id: 123456789
        },
        body: {
          firstName: "Test",
          lastName: "User"
        }
      };

      customerController.updateCustomer(req, resStub);

      expect(queryCustomerStub.update.calledWith(req.params.id, req.body)).to.equal(true);
    });

    it('should return 200 successful', (done) => {
      const req = {
        params: {
          id: 123456789
        },
        body: {
          firstName: "Test",
          lastName: "User"
        }
      };

      customerController.updateCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.status.calledWith(200)).to.equal(true);
      }).then(done, done);
    });

    it('should update customer successful', (done) => {
      const req = {
        params: {
          id: 123456789
        },
        body: {
          firstName: "Test",
          lastName: "User"
        }
      };
      const expected = {};

      customerController.updateCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.json.calledWith(expected)).to.equal(true);
      }).then(done, done);
    });
  });

  describe('deleteCustomer successfully', () => {
    let queryCustomerPromise, customerController;
    let resStub = {};
    const queryCustomerStub = {};

    beforeEach(() => {
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);

      queryCustomerPromise = new Promise((resolve) => {
        resolve();
      });

      queryCustomerStub.remove = sinon.stub().returns(queryCustomerPromise);

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

      customerController.deleteCustomer(req, resStub);

      expect(queryCustomerStub.remove.calledWith(req.params.id)).to.equal(true);
    });

    it('should return 200 successful', (done) => {
      const req = {
        params: {
          id: 123456789
        }
      };

      customerController.deleteCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.status.calledWith(200)).to.equal(true);
      }).then(done, done);
    });

    it('should delete customer successful', (done) => {
      const req = {
        params: {
          id: 123456789
        }
      };
      const expected = {};

      customerController.deleteCustomer(req, resStub);

      queryCustomerPromise.then(() => {
        expect(resStub.json.calledWith(expected)).to.equal(true);
      }).then(done, done);
    });
  });
});