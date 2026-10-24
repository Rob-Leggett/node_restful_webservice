import User from '../model/user.js';

// Reject non-string input so request bodies can't inject query operators such as { "$ne": null }
export const getByName = async (name) => {
  if (typeof name !== 'string') return null;
  return User.findOne({ name: { $eq: name } });
};
