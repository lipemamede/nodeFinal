const AWS = require('aws-sdk');
AWS.config.update({ region: 'sa-east-1' });
const isLocal = process.env.TODOMANAGERLOCAL
if (!isLocal) {
AWS.config.update({
credentials: {
accessKeyId: 'AKIA3HRETHUVLBP3M7MY',
secretAccessKey: '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'
}
});
} else {
AWS.config.update({
endpoint: 'http://localhost:8000'
});
}
module.exports = AWS;
