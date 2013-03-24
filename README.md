mongoose-shortid
================

This plugin provides a new Schema Type, ShortId, that can be used in place of ObjectId. The generated ids are random url-safe base64 strings of configurable length. This plugin will automatically retry inserts on id collision. The number of retries is 4 by default but is configurable.

### Usage

    var mongoose = require('mongoose');
    var ShortId = require('mongoose-shortid');

    var personSchema = mongoose.Schema({
        _id: ShortId,
        name: String
    });

### Options

    var personSchema = mongoose.Schema({
        _id: {
            type: ShortId,
            len: 12,
            retries: 2
        },
        name: String
    });
