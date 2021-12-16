const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
    setId: String,
    flowId: String,
    setName: String,
    seriesNumber: String,
    assetPath: String,
    setVisualID: String,
})

let Set = mongoose.model("Set", setSchema);

exports.Set = Set;