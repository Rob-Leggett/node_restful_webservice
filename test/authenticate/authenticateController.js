const proxyquire = require('proxyquire');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Authenticate Controller', () => {

  describe('authenticate successfully', () => {
    let queryUserPromise, authenticateController;
    let resStub = {};
    const queryUserStub = {};
    const configStub = {};
    const jsonWebTokenStub = {};

    const tokenStub = "aaaaabbbbbcccccc";
    const secretStub = "secret";
    const userStub = {name: "Test", password: "Pass", role: "User"};

    beforeEach(() => {
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);

      jsonWebTokenStub.sign = sinon.stub().returns(tokenStub);

      configStub.secret = sinon.stub().returns(secretStub);

      queryUserPromise = new Promise((resolve) => {
        resolve(userStub);
      });

      queryUserStub.getByName = sinon.stub().returns(queryUserPromise);

      authenticateController = proxyquire('../../app/authenticate/authenticateController', {
        'jsonwebtoken': jsonWebTokenStub,
        '../configuration/config': configStub,
        '../user/db/query/queryUser': queryUserStub
      });
    });

    it('should call query user successful', () => {
      const req = {
        body: {
          name: "Test",
          password: "Pass"
        }
      };

      authenticateController.authenticate(req, resStub);

      expect(queryUserStub.getByName.calledWith(req.body.name)).to.equal(true);
    });

    it('should return 200 successful', (done) => {
      const req = {
        body: {
          name: "Test",
          password: "Pass"
        }
      };

      authenticateController.authenticate(req, resStub);

      queryUserPromise.then(() => {
        expect(resStub.status.calledWith(200)).to.equal(true);
      }).then(done, done);
    });

    it('should return token successful', (done) => {
      const req = {
        body: {
          name: "Test",
          password: "Pass"
        }
      };
      const expected = {token: tokenStub};

      authenticateController.authenticate(req, resStub);

      queryUserPromise.then(() => {
        expect(resStub.json.calledWith(expected)).to.equal(true);
      }).then(done, done);
    });
  });

  describe('authenticate unsuccessfully (user not found)', () => {
    let queryUserPromise, authenticateController;
    let resStub = {};
    const queryUserStub = {};

    const userStub = null;


    beforeEach(() => {
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);


      queryUserPromise = new Promise((resolve) => {
        resolve(userStub);
      });

      queryUserStub.getByName = sinon.stub().returns(queryUserPromise);

      authenticateController = proxyquire('../../app/authenticate/authenticateController', {
        '../user/db/query/queryUser': queryUserStub
      });
    });

    it('should call query user successful', () => {
      const req = {
        body: {
          name: "Test",
          password: "Pass"
        }
      };

      authenticateController.authenticate(req, resStub);

      expect(queryUserStub.getByName.calledWith(req.body.name)).to.equal(true);
    });

    it('should return 403 successful', (done) => {
      const req = {
        body: {
          name: "Test",
          password: "Pass"
        }
      };

      authenticateController.authenticate(req, resStub);

      queryUserPromise.then(() => {
        expect(resStub.status.calledWith(403)).to.equal(true);
      }).then(done, done);
    });

    it('should return error successful', (done) => {
      const req = {
        body: {
          name: "Test",
          password: "Pass"
        }
      };
      const expected = {error: 'Authentication failed.'};

      authenticateController.authenticate(req, resStub);

      queryUserPromise.then(() => {
        expect(resStub.json.calledWith(expected)).to.equal(true);
      }).then(done, done);
    });
  });

  describe('authenticate unsuccessfully (password mismatch)', () => {
    let queryUserPromise, authenticateController;
    let resStub = {};
    const queryUserStub = {};

    const userStub = {name: "Test", password: "Pass", role: "User"};

    beforeEach(() => {
      resStub.status = sinon.stub().returns(resStub);
      resStub.json = sinon.stub().returns(resStub);

      queryUserPromise = new Promise((resolve) => {
        resolve(userStub);
      });

      queryUserStub.getByName = sinon.stub().returns(queryUserPromise);

      authenticateController = proxyquire('../../app/authenticate/authenticateController', {
        '../user/db/query/queryUser': queryUserStub
      });
    });

    it('should call query user successful', () => {
      const req = {
        body: {
          name: "Test",
          password: "Guess"
        }
      };

      authenticateController.authenticate(req, resStub);

      expect(queryUserStub.getByName.calledWith(req.body.name)).to.equal(true);
    });

    it('should return 403 successful', (done) => {
      const req = {
        body: {
          name: "Test",
          password: "Guess"
        }
      };

      authenticateController.authenticate(req, resStub);

      queryUserPromise.then(() => {
        expect(resStub.status.calledWith(403)).to.equal(true);
      }).then(done, done);
    });

    it('should return error successful', (done) => {
      const req = {
        body: {
          name: "Test",
          password: "Guess"
        }
      };
      const expected = {error: 'Authentication failed.'};

      authenticateController.authenticate(req, resStub);

      queryUserPromise.then(() => {
        expect(resStub.json.calledWith(expected)).to.equal(true);
      }).then(done, done);
    });
  });
});