const AWS = require('aws-sdk');
AWS.config.update({ region: 'sa-east-1' });
const isLocal = process.env.TODOMANAGERLOCAL
if (!isLocal) {
AWS.config.update({
credentials: {
accessKeyId: 'accesskey',
secretAccessKey: 'secretkey'
}
});
} else {
AWS.config.update({
endpoint: 'http://localhost:8000'
});
}
module.exports = AWS;
