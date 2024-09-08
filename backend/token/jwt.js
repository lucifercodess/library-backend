import jwt from 'jsonwebtoken';

export const genToken = async (userId, role, res) => {
  try {
    let token;
    if (role === 'admin') {
      token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('AdminToken', token, { httpOnly: true, maxAge: 604800000 });
    } else if (role === 'user') {
      token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('UserToken', token, { httpOnly: true, maxAge: 604800000 });
    }

    return token;
  } catch (error) {
    console.error('Error generating token', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
