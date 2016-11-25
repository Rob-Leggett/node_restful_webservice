const Customer = require('../user/db/model/customer');

function getById(req, res) {
  Customer.findById({id: req.params.id}, (err, customers) => {
    res.status(200).json(customers);
  });
}

function get(req, res) {
  Customer.find({}, (err, customers) => {
    res.status(200).json(customers);
  });
}

function save(req, res) {
  Customer.insert(req.body, (err) => {
    res.status(200).json({});
  });
}

function update(req, res) {
  Customer.update({_id: req.params.id}, {$set: req.body}, (err) => {
    res.status(200).json({});
  });
}

function remove(req, res) {
  Customer.remove({_id: req.body.id}, (err) => {
    res.status(200).json({});
  });
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  getById,
  get,
  save,
  update,
  remove
};