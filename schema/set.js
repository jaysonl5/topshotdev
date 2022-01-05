const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
    setId: {type: String, index: { unique: true, dropDups: true }},
    flowId: String,
    setName: String,
    seriesNumber: String,
    assetPath: String,
    setVisualID: String
})

let Set = mongoose.model("Set", setSchema);

exports.Set = Set;