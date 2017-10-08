const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.ProcessInfo = functions.https.onRequest((req, res) => {
    res.json(200, {
        version: process.version,
        arch: process.arch,
        platform: process.platform,
        versions: process.versions,
        features: process.features,
        release: process.release
    });
});

exports.WriteProcessInfo = functions.https.onRequest((req, res) => {
    const timer = Date.now();
    axios.get('https://us-central1-serverless-node-history.cloudfunctions.net/ProcessInfo')
    .then(axres => {
        const lap = Date.now();
        const resource = {
            datetime: new Date(lap),
            success: true,
            request: axres.config.url,
            timer: lap-timer,
            data: axres.data
        };
        
        const docRef = firestore.collection('results').add(resource).then(ref => {
            res.status(200).json({
                sucess: true,
                ref: ref.id
            });
        });
    })
    .catch(err => {
        console.log(err);
        // TODO: write error
    });
});