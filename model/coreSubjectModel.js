const mongoose = require('mongoose');
const { Schema } = mongoose;
const coreSubjectSchema = new Schema({
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

module.exports = mongoose.model('coreSubject', coreSubjectSchema);