const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema({
    code: {type: String, required: true},
    identifier: {type: String, required: true}
});

const pasteModel = mongoose.model("pasteModel", pasteSchema);

module.exports = pasteModel
