var mongo = undefined;

exports.configure = function (params) {
    mongo = params.mongo;
};

exports.list =function (req, res, next) {
    console.log('List of users');
    mongo.list(function(items){
        res.send(items);
    });
};
