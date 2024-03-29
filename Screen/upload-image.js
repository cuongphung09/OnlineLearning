'use strict';
import storage from '@google-cloud/storage';

const gcs = storage({
    projectId: 'OnlineLearning',
    keyFilename: '../config/online-learning-8ff74-0c573cf5776c.json'
});

const bucketName = 'bucket-name-for-upload'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
    console.log('https://storage.googleapis.com/' + bucketName + '/' + filename)
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
    if (!req.file) return next();

    // Can optionally add a path to the gcsname below by concatenating it before the filename
    const gcsname = req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });

    stream.end(req.file.buffer);
}

export default ImgUpload;