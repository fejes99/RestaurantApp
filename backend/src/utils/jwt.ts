import jwt, { SignOptions } from 'jsonwebtoken';

const accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY;
const refreshTokenPublicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY;

//  Sign Access or Refresh Token
export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  let token;
  if (keyName === 'accessTokenPrivateKey') {
    token = accessTokenPublicKey;
  } else {
    token = refreshTokenPublicKey;
  }
  const privateKey = Buffer.from(token, 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    let token;
    if (keyName === 'accessTokenPublicKey') {
      token = accessTokenPublicKey;
    } else {
      token = refreshTokenPublicKey;
    }
    const publicKey = Buffer.from(token, 'base64').toString('ascii');
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '100d',
  });
};
