import User from '../model/user.js';

export const getByName = (name) => User.findOne({ name });