exports.users = require('./users');

exports.configure = function (params) {
    exports.users.configure(params);
};
