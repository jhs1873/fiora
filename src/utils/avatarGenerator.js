const avatar = require('avatar-generator')();
const path = require('path');
const uploadFile = require('./uploadFile');
const config = require('../../config/index').project;

const tempDir = path.join(__dirname, '../../temp');

function generate(key, gender, size) {
    const file = path.join(tempDir, key);
    return new Promise((resolve, reject) => {
        avatar(key, gender, size)
        .write(file, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(file);
        });
    });
}

module.exports = async (key, gender, size = 64) => {
    const avatarFile = await generate(key, gender, size);
    const avatarQiniu = await uploadFile(`user_default_avatar_${Date.now().toString()}`, avatarFile);
    return `http://${config.bucketUrl}/${avatarQiniu.key}`;
};

