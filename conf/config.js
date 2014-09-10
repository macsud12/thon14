var fs = require('fs');
var nconf = require('nconf');
var Logger = require('bunyan');

nconf.argv()
    .env()
    .file({ file: './conf/def.json' });
nconf.load();

console.log('about: ' + nconf.get('about'));
exports.conf = nconf;

//===== LOGGER =======
exports.logger = new Logger.createLogger({
    name: 'thon14',
    serializers: {
        req: Logger.stdSerializers.req
    },
    streams: [
        {
            level: 'info',
            type: 'rotating-file',
            path: nconf.get('path'),
            period: '1d',   // weekly rotation
            count: 10        // keep 10 back copies
        }
    ]
})
