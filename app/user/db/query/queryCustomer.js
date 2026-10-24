import Customer from '../model/customer.js';

const CUSTOMER_FIELDS = ['firstName', 'lastName', 'company'];

// Only accept known scalar fields so request bodies can't inject query operators or extra fields
export const customerFields = (body) => {
  const fields = {};
  for (const key of CUSTOMER_FIELDS) {
    if (typeof body?.[key] === 'string') fields[key] = body[key];
  }
  return fields;
};

export const getById = (id) => Customer.findById(id);

export const get = () => Customer.find({});

export const save = (body) => new Customer(customerFields(body)).save();

export const update = (id, body) => Customer.findByIdAndUpdate(id, { $set: customerFields(body) }, { upsert: true, returnDocument: 'after' });

export const remove = (id) => Customer.findByIdAndDelete(id);
