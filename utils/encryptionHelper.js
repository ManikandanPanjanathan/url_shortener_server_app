const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex') ?? '';

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex') };
}

function decrypt(encrypted, iv) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };