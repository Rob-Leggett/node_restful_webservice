import { expect } from 'chai';
import sinon from 'sinon';

// Mock modules
const mockQueryUser = {
  getByName: null
};

const mockConfig = {
  secret: 'testsecret'
};

const mockJwt = {
  sign: null
};

// Create controller with mocks
const createController = () => {
  return {
    authenticate: async (req, res) => {
      try {
        const user = await mockQueryUser.getByName(req.body.name);

        if (!user || user.password !== req.body.password) {
          return res.status(403).json({ error: 'Authentication failed.' });
        }

        const token = mockJwt.sign(
          { name: user.name, role: user.role },
          mockConfig.secret,
          { expiresIn: '24h' }
        );

        res.status(200).json({ token });
      } catch {
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  };
};

describe('Authenticate Controller', () => {
  let resStub;
  let authenticateController;

  beforeEach(() => {
    resStub = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('authenticate successfully', () => {
    const tokenStub = 'aaaaabbbbbcccccc';
    const userStub = { name: 'Test', password: 'Pass', role: 'User' };

    beforeEach(() => {
      mockJwt.sign = sinon.stub().returns(tokenStub);
      mockQueryUser.getByName = sinon.stub().resolves(userStub);
      authenticateController = createController();
    });

    it('should call query user successfully', async () => {
      const req = { body: { name: 'Test', password: 'Pass' } };

      await authenticateController.authenticate(req, resStub);

      expect(mockQueryUser.getByName.calledWith(req.body.name)).to.equal(true);
    });

    it('should return 200 successfully', async () => {
      const req = { body: { name: 'Test', password: 'Pass' } };

      await authenticateController.authenticate(req, resStub);

      expect(resStub.status.calledWith(200)).to.equal(true);
    });

    it('should return token successfully', async () => {
      const req = { body: { name: 'Test', password: 'Pass' } };
      const expected = { token: tokenStub };

      await authenticateController.authenticate(req, resStub);

      expect(resStub.json.calledWith(expected)).to.equal(true);
    });
  });

  describe('authenticate unsuccessfully (user not found)', () => {
    beforeEach(() => {
      mockQueryUser.getByName = sinon.stub().resolves(null);
      authenticateController = createController();
    });

    it('should call query user successfully', async () => {
      const req = { body: { name: 'Test', password: 'Pass' } };

      await authenticateController.authenticate(req, resStub);

      expect(mockQueryUser.getByName.calledWith(req.body.name)).to.equal(true);
    });

    it('should return 403 successfully', async () => {
      const req = { body: { name: 'Test', password: 'Pass' } };

      await authenticateController.authenticate(req, resStub);

      expect(resStub.status.calledWith(403)).to.equal(true);
    });

    it('should return error successfully', async () => {
      const req = { body: { name: 'Test', password: 'Pass' } };
      const expected = { error: 'Authentication failed.' };

      await authenticateController.authenticate(req, resStub);

      expect(resStub.json.calledWith(expected)).to.equal(true);
    });
  });

  describe('authenticate unsuccessfully (password mismatch)', () => {
    const userStub = { name: 'Test', password: 'Pass', role: 'User' };

    beforeEach(() => {
      mockQueryUser.getByName = sinon.stub().resolves(userStub);
      authenticateController = createController();
    });

    it('should call query user successfully', async () => {
      const req = { body: { name: 'Test', password: 'Guess' } };

      await authenticateController.authenticate(req, resStub);

      expect(mockQueryUser.getByName.calledWith(req.body.name)).to.equal(true);
    });

    it('should return 403 successfully', async () => {
      const req = { body: { name: 'Test', password: 'Guess' } };

      await authenticateController.authenticate(req, resStub);

      expect(resStub.status.calledWith(403)).to.equal(true);
    });

    it('should return error successfully', async () => {
      const req = { body: { name: 'Test', password: 'Guess' } };
      const expected = { error: 'Authentication failed.' };

      await authenticateController.authenticate(req, resStub);

      expect(resStub.json.calledWith(expected)).to.equal(true);
    });
  });
});