module.exports = exports = function() {
    var crypto = require('crypto');

    return function(len, cb) { 
        if (!cb) {
            cb = len;
            len = 7;
        }

        var bytesNeeded = Math.ceil(len * 0.75);
        crypto.pseudoRandomBytes(bytesNeeded, function(err, buf) {
            var id = buf.toString('base64').substring(0, len);
            id = id.replace('+', '-');
            id = id.replace('/', '_');
            cb(null, id);
        });
    };
}();
