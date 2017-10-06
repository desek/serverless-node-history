const functions = require('firebase-functions');

exports.ProcessInfo = functions.https.onRequest((req, res) => {
    res.json(200, {
        version: process.version,
        arch: process.arch,
        platform: process.platform,
        versions: process.versions,
        features: process.features,
        release: process.release
    });
})