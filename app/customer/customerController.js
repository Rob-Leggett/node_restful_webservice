const queryCustomer = require('../user/db/query/queryCustomer');

function getCustomer(req, res) {
  queryCustomer.getById(req.params.id).then((customer) => {

    let response = {};

    if (customer) {
      response = customer;
    }

    res.status(200).json(response);
  });
}

function getCustomers(req, res) {
  queryCustomer.get().then((customers) => {
    let response = {};

    if (customers) {
      response.customers = customers;
    }

    res.status(200).json(response);
  });
}

function saveCustomer(req, res) {
  queryCustomer.save(req.body).then(() => {
    let response = {};

    res.status(200).json(response);
  });
}

function updateCustomer(req, res) {
  queryCustomer.update(req.params.id, req.body).then(() => {
    let response = {};

    res.status(200).json(response);
  });
}

function deleteCustomer(req, res) {
  queryCustomer.remove(req.params.id).then(() => {
    res.status(200).json({});
  });
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  getCustomer,
  getCustomers,
  saveCustomer,
  updateCustomer,
  deleteCustomer
};