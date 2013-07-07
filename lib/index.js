module.exports = exports = function(mongoose) {
    var ShortId = require('./shortid')(mongoose);
    var genId = require('./genid');
    
    var defaultSave = mongoose.Model.prototype.save;
    mongoose.Model.prototype.save = function(cb) {
        if (this.isNew) {
            var idType = this.schema.tree['_id'];

            if (idType === ShortId || idType.type === ShortId) {
                var idInfo = this.schema.path('_id');
                var len = idInfo.len;
                var retries = idInfo.retries;
                var self = this;
                function attemptSave() {
                    genId(len, function(err, id) {
                        if (err) {
                            cb(err);
                            return;
                        }
                        self._id = id;
                        defaultSave.call(self, function(err, obj) {
                            if (err &&
                                err.code == 11000 &&
                                err.err.indexOf('_id') !== -1 &&
                                retries > 0
                            ) {
                                console.info("retrying");
                                --retries;
                                attemptSave();
                            } else {
                                // TODO check these args
                                cb(err, obj);
                            }
                        });
                    });
                }
                attemptSave();
                return;
            }
        }

        defaultSave.call(this, cb);
    };

    return ShortId;
};
