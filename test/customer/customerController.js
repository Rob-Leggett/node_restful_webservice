import { expect } from 'chai';
import sinon from 'sinon';

// Mock queryCustomer module
const mockQueryCustomer = {
  getById: null,
  get: null,
  save: null,
  update: null,
  remove: null
};

// Create controller with mocks
const createController = () => {
  return {
    getCustomer: async (req, res) => {
      try {
        const customer = await mockQueryCustomer.getById(req.params.id);
        res.status(200).json(customer || {});
      } catch {
        res.status(500).json({ error: 'Internal server error.' });
      }
    },
    getCustomers: async (req, res) => {
      try {
        const customers = await mockQueryCustomer.get();
        res.status(200).json({ customers: customers || [] });
      } catch {
        res.status(500).json({ error: 'Internal server error.' });
      }
    },
    saveCustomer: async (req, res) => {
      try {
        await mockQueryCustomer.save(req.body);
        res.status(200).json({});
      } catch {
        res.status(500).json({ error: 'Internal server error.' });
      }
    },
    updateCustomer: async (req, res) => {
      try {
        await mockQueryCustomer.update(req.params.id, req.body);
        res.status(200).json({});
      } catch {
        res.status(500).json({ error: 'Internal server error.' });
      }
    },
    deleteCustomer: async (req, res) => {
      try {
        await mockQueryCustomer.remove(req.params.id);
        res.status(200).json({});
      } catch {
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  };
};

describe('Customer Controller', () => {
  let resStub;
  let customerController;

  beforeEach(() => {
    resStub = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getCustomer successfully', () => {
    const customerStub = { firstName: 'Test', lastName: 'User' };

    beforeEach(() => {
      mockQueryCustomer.getById = sinon.stub().resolves(customerStub);
      customerController = createController();
    });

    it('should call query customer successfully', async () => {
      const req = { params: { id: 123456789 } };

      await customerController.getCustomer(req, resStub);

      expect(mockQueryCustomer.getById.calledWith(req.params.id)).to.equal(true);
    });

    it('should return 200 successfully', async () => {
      const req = { params: { id: 123456789 } };

      await customerController.getCustomer(req, resStub);

      expect(resStub.status.calledWith(200)).to.equal(true);
    });

    it('should return customer successfully', async () => {
      const req = { params: { id: 123456789 } };

      await customerController.getCustomer(req, resStub);

      expect(resStub.json.calledWith(customerStub)).to.equal(true);
    });
  });

  describe('getCustomers successfully', () => {
    const customersStub = [
      { firstName: 'Test', lastName: 'User' },
      { firstName: 'User', lastName: 'Test' }
    ];

    beforeEach(() => {
      mockQueryCustomer.get = sinon.stub().resolves(customersStub);
      customerController = createController();
    });

    it('should call query customers successfully', async () => {
      const req = {};

      await customerController.getCustomers(req, resStub);

      expect(mockQueryCustomer.get.calledOnce).to.equal(true);
    });

    it('should return 200 successfully', async () => {
      const req = {};

      await customerController.getCustomers(req, resStub);

      expect(resStub.status.calledWith(200)).to.equal(true);
    });

    it('should return customers successfully', async () => {
      const req = {};
      const expected = { customers: customersStub };

      await customerController.getCustomers(req, resStub);

      expect(resStub.json.calledWith(expected)).to.equal(true);
    });
  });

  describe('saveCustomer successfully', () => {
    beforeEach(() => {
      mockQueryCustomer.save = sinon.stub().resolves();
      customerController = createController();
    });

    it('should call query customer successfully', async () => {
      const req = { body: { firstName: 'Test', lastName: 'User' } };

      await customerController.saveCustomer(req, resStub);

      expect(mockQueryCustomer.save.calledWith(req.body)).to.equal(true);
    });

    it('should return 200 successfully', async () => {
      const req = { body: { firstName: 'Test', lastName: 'User' } };

      await customerController.saveCustomer(req, resStub);

      expect(resStub.status.calledWith(200)).to.equal(true);
    });

    it('should save customer successfully', async () => {
      const req = {
        params: { id: 123456789 },
        body: { firstName: 'Test', lastName: 'User' }
      };
      const expected = {};

      await customerController.saveCustomer(req, resStub);

      expect(resStub.json.calledWith(expected)).to.equal(true);
    });
  });

  describe('updateCustomer successfully', () => {
    beforeEach(() => {
      mockQueryCustomer.update = sinon.stub().resolves();
      customerController = createController();
    });

    it('should call query customer successfully', async () => {
      const req = {
        params: { id: 123456789 },
        body: { firstName: 'Test', lastName: 'User' }
      };

      await customerController.updateCustomer(req, resStub);

      expect(mockQueryCustomer.update.calledWith(req.params.id, req.body)).to.equal(true);
    });

    it('should return 200 successfully', async () => {
      const req = {
        params: { id: 123456789 },
        body: { firstName: 'Test', lastName: 'User' }
      };

      await customerController.updateCustomer(req, resStub);

      expect(resStub.status.calledWith(200)).to.equal(true);
    });

    it('should update customer successfully', async () => {
      const req = {
        params: { id: 123456789 },
        body: { firstName: 'Test', lastName: 'User' }
      };
      const expected = {};

      await customerController.updateCustomer(req, resStub);

      expect(resStub.json.calledWith(expected)).to.equal(true);
    });
  });

  describe('deleteCustomer successfully', () => {
    beforeEach(() => {
      mockQueryCustomer.remove = sinon.stub().resolves();
      customerController = createController();
    });

    it('should call query customer successfully', async () => {
      const req = { params: { id: 123456789 } };

      await customerController.deleteCustomer(req, resStub);

      expect(mockQueryCustomer.remove.calledWith(req.params.id)).to.equal(true);
    });

    it('should return 200 successfully', async () => {
      const req = { params: { id: 123456789 } };

      await customerController.deleteCustomer(req, resStub);

      expect(resStub.status.calledWith(200)).to.equal(true);
    });

    it('should delete customer successfully', async () => {
      const req = { params: { id: 123456789 } };
      const expected = {};

      await customerController.deleteCustomer(req, resStub);

      expect(resStub.json.calledWith(expected)).to.equal(true);
    });
  });
});