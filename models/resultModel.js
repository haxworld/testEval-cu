const mongoose = require('mongoose');
const { Schema } = mongoose;
const testResultSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testseriesid: {
        type: Schema.Types.ObjectId,
        ref: 'TestSeries',
        required: true
    },
    subjectid: {
        type: Schema.Types.ObjectId,
        ref: 'SubjectCategory',
        required: true
    },
    result: [{
        type: String,
        required: true
    }],
    hidden: Boolean,
}, {
    timestamps: true,
});

module.exports = mongoose.model('ResultSchema', testResultSchema);