const Customer = require('../user/db/model/customer');

function getById(req, res) {
  Customer.findById({_id: req.params.id}, (err, customer) => {
    let response = {};

    if (customer) {
      response = customer;
    }

    res.status(200).json(response);
  });
}

function get(req, res) {
  Customer.find({}, (err, customers) => {
    let response = {};

    if (customers) {
      response.customers = customers;
    }

    res.status(200).json(response);
  });
}

function saveOrUpdate(req, res) {
  Customer.update({_id: req.params.id}, {$set: req.body}, {upsert: true}, (err) => {
    let response = {};

    res.status(200).json(response);
  });
}

function remove(req, res) {
  Customer.remove({_id: req.params.id}, (err) => {
    res.status(200).json({});
  });
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  getById,
  get,
  saveOrUpdate,
  remove
};