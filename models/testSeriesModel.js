const mongoose = require('mongoose');
const { Schema } = mongoose;
const testSeriesSchema = new Schema({
    title: {
        required: true,
        type: String,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'SubjectCategory'
    },
    totalTime: {
        type: Number,
        default: 0
    },
    desc: String,
    hidden: Boolean,
}, {
    timestamps: true,
});

module.exports = mongoose.model('TestSeries', testSeriesSchema);