mongoose-shortid
================

This plugin provides a new Schema Type, ShortId, that can be used in place of ObjectId. The generated IDs are random url-safe strings of configurable length, represented in a configurable base (10, 16, 32, 36, 62, 64 only).

This plugin will automatically retry inserts on a collision.

### Usage

    var mongoose = require('mongoose');
    var ShortId = require('mongoose-shortid')(mongoose);

    var personSchema = mongoose.Schema({
        _id: ShortId,
        name: String
    });

### Options

The default options are:

    var personSchema = mongoose.Schema({
        _id: {
            type: ShortId,
            len: 7,     // Length 7 characters
            base: 64,   // Web-safe base 64 encoded string
            alphabet: undefined // Use default alphabet for base
            retries: 4  // Four retries on collision
        },
        name: String
    });

A custom alphabet can be provided using the `alphabet` option. This takes priority over the `base` argument.

    var personSchema = mongoose.Schema({
        _id: {
            type: ShortId,
            len: 9,
            alphabet: 'fubar'
        }
    });

The generated IDs will be 9 characters long with only the characters `f` `u` `b` `a` and `r`.
