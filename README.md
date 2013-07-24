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
            base: 64,   // Base 64 encoded string
            retries: 4  // Four retries on collision
        },
        name: String
    });
