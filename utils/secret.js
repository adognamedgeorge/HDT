var CryptoJS = require("crypto-js");
var Base64 = require('./base64.js');

/**
 * 加密（依赖aes.js）
 * @param word 解密的字符串
 * @param key 密钥
 * @returns {*}
 */
function encryptPassword(password, _key, uid, randomStr) {
    const buildKey = uid + randomStr + _key;
    const secretKey = CryptoJS.MD5(buildKey).toString().substr(9, 16);
    const enData = encrypt(password, secretKey);
    return Base64.base64encode(`${uid};${enData};${randomStr}`);
}

/**
 * 解密
 * @param word 加密的字符串
 * @param key 密钥
 * @returns {*}
 */
function decryptPassword(_enData, _key) {
    const dataStr = Base64.base64decode(_enData);
    if (dataStr) {
        const [uid, enData, randomStr] = dataStr.split(';');
        const buildKey = uid + randomStr + _key;
        const secretKey = CryptoJS.MD5(buildKey).toString().substr(9, 16);
        return decrypt(enData, secretKey);
    }
    return null;
}

/**
 * 加密（依赖aes.js）
 * @param word 加密的字符串
 * @param key 密钥
 * @returns {*}
 */
function encrypt(word, _key) {
    const key = CryptoJS.enc.Utf8.parse(_key);
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

/**
 * 解密
 * @param word 解密的字符串
 * @param key 密钥
 * @returns {*}
 */
function decrypt(word, _key) {
    const key = CryptoJS.enc.Utf8.parse(_key);
    const decryptData = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decryptData).toString();
}

module.exports = {
    encryptPassword: encryptPassword,
    decryptPassword: decryptPassword
};



