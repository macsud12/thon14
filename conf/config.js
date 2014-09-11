var fs = require('fs');
var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: './conf/def.json' });
nconf.load();

console.log('about: ' + nconf.get('about'));
exports.conf = nconf;
