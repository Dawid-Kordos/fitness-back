import { promisify } from 'util';
import crypto from 'crypto';
const { createCipheriv, createDecipheriv } = require('crypto');

const scrypt = promisify(crypto.scrypt);
const randomBytes = promisify(crypto.randomBytes);

export const encryptText = async (text: string, password: string, salt: string) => {
  const algorithm = 'aes-192-cbc';
  const key = await scrypt(password, salt, 24);
  const iv = await randomBytes(16);

  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encrypted,
    iv: iv.toString('hex'),
  };
}

export const decryptText = async (text: string, password: string, salt: string, ivHex: string) => {
  const algorithm = 'aes-192-cbc';
  const key = await scrypt(password, salt, 24);
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
