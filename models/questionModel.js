const mongoose = require('mongoose');
const { Schema } = mongoose;
const questionSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    incorrectOptions: [{
        type: String,
        required: true,
        default: null
    }],
    correctAnswer: {
        type: String,
        required: true,
        default: null
    },
    hidden: Boolean,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Question', questionSchema);