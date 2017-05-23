'use strict';

module.exports = function (mongoose) {
    let Types = mongoose.Schema.Types;
    let Schema = new mongoose.Schema({
        id: {
            type: Types.String,
            unique: true
        },
        title: {
            type: Types.String,
            allowNull: false
        },
    });

    Schema.statics = {
        collectionName: "invoice",
        routeOptions: {}
    };

    return Schema;
};