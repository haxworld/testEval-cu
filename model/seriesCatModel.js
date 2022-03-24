const mongoose = require('mongoose');
const { Schema } = mongoose;
const seriesCatSchema = new Schema({
    title: {
        required: true,
        type: String,
        unique: true
    },
    desc: String,
    hidden: Boolean,
}, {
    timestamps: true,
});

module.exports = mongoose.model('seriesCat', seriesCatSchema);