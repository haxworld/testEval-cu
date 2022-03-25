const mongoose = require('mongoose');
const { Schema } = mongoose;
const testResultSchema = new Schema({
    title: {
        required: true,
        type: String,
        unique: true
    },
    topicCategory: {
        type: String,
        default: null
    },
    desc: String,
    hidden: Boolean,
}, {
    timestamps: true,
});

module.exports = mongoose.model('TestResultSchema', testResultSchema);