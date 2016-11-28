const Customer = require('../model/customer');

function getById(id) {
  return Customer.findById({_id: id});
}

function get() {
  return Customer.find({});
}

function save(body) {
  return new Customer(body).save();
}

function update(id, body) {
  return Customer.update({_id: id}, {$set: body}, {upsert: true});
}

function remove(id) {
  return Customer.remove({_id: id});
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  getById,
  get,
  save,
  update,
  remove
};