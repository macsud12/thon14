var mongoose = require('mongoose');
var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed });
var users =  mongoose.model('sessions', Any);
exports.connect = function (dburl, callback) {
    mongoose.connect(dburl);
    if (callback) callback();
};


exports.list = function (callback) {
    users.find().exec(function(err, items) {
        console.log(items);
        if(err) console.log(err);
        else callback(items)});

};
