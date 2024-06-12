const { Storage } = require('@google-cloud/storage');
const uuid = require('uuid');
const path = require('path');

const storage = new Storage({
    projectId: 'suargatesting',
    keyFilename: path.join(__dirname, '../../storage-key.json'),
});

const bucket = storage.bucket('bucket-suarga-app');

async function handleImageUpload(file, slugResult) {
    return new Promise((resolve, reject) => {

        try {
            const filePath = `images/${slugResult}/${uuid.v4()}-${file.originalname}`;
            const blob = bucket.file(filePath);

            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (err) => {
                reject({
                    message: `Something is wrong! Unable to upload at the moment. `+ err.message,
                });
            });

            blobStream.on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
                resolve({
                    publicUrl: publicUrl
                });
            });

            blobStream.end(file.buffer);
        } catch (error) {
            reject({
                message: error.message,
            });
        }
    });
}

async function deleteImageStorage(publicUrl) {
    const bucketBaseUrl = 'https://storage.googleapis.com/bucket-suarga-app/';
    const filePath = publicUrl.replace(bucketBaseUrl, '');

    await bucket.file(filePath).delete();
}

module.exports = { 
    handleImageUpload,
    deleteImageStorage
};