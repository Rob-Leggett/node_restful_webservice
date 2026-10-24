import jwt from 'jsonwebtoken';
import config from '../configuration/config.js';
import * as queryUser from '../user/db/query/queryUser.js';

export const authenticate = async (req, res) => {
  try {
    // Express 5 leaves req.body undefined when no body was parsed
    const { name, password } = req.body ?? {};
    const user = await queryUser.getByName(name);

    if (!user || user.password !== password) {
      return res.status(403).json({ error: 'Authentication failed.' });
    }

    const token = jwt.sign(
      { name: user.name, role: user.role },
      config.secret,
      { expiresIn: '24h' }
    );

    res.status(200).json({ token });
  } catch {
    res.status(500).json({ error: 'Internal server error.' });
  }
};