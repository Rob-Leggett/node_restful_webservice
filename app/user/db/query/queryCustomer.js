import Customer from '../model/customer.js';

export const getById = (id) => Customer.findById(id);

export const get = () => Customer.find({});

export const save = (body) => new Customer(body).save();

export const update = (id, body) => Customer.findByIdAndUpdate(id, { $set: body }, { upsert: true, new: true });

export const remove = (id) => Customer.findByIdAndDelete(id);