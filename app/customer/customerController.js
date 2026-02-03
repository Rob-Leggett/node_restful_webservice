import * as queryCustomer from '../user/db/query/queryCustomer.js';

export const getCustomer = async (req, res) => {
  try {
    const customer = await queryCustomer.getById(req.params.id);
    res.status(200).json(customer || {});
  } catch {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await queryCustomer.get();
    res.status(200).json({ customers: customers || [] });
  } catch {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const saveCustomer = async (req, res) => {
  try {
    const customer = await queryCustomer.save(req.body);
    res.status(201).json(customer);
  } catch {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await queryCustomer.update(req.params.id, req.body);
    res.status(200).json(customer || {});
  } catch {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    await queryCustomer.remove(req.params.id);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Internal server error.' });
  }
};