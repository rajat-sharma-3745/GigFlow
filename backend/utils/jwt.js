import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure:true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  };

  res.cookie('token', token, cookieOptions);
};

export const clearTokenCookie = (res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
};