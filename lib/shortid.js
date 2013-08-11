module.exports = exports = function (mongoose) {
    var Schema = mongoose.Schema
      , Types = mongoose.Types
      , SchemaString = mongoose.Schema.Types.String;

    function ShortId(key, options) {
        this.len = options.len || 7;
        this.retries = options.retries || 4;
        this.base = options.base || 64;
        this.alphabet = options.alphabet;
        SchemaString.call(this, key, options);
    };

    ShortId.prototype.__proto__ = SchemaString.prototype;

    Schema.Types.ShortId = ShortId;
    Types.ShortId = String;
    return ShortId;
};
