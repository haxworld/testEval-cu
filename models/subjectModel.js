const mongoose = require('mongoose');
const { Schema } = mongoose;
const subjectSchema = new Schema({
    title: {
        required: true,
        type: String,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'TestCategory'
    },
    totalTime: {
        type: Date,
        default: null
    },
    desc: String,
    hidden: Boolean,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Subject', subjectSchema);