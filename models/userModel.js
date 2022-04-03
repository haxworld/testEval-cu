const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: null
    },
    collegeName: {
        type: String,
        default: null
    },
    graduationYear: {
        type: Number,
        default: null
    },
    isTestOn: {
        type: Boolean,
        default: false
    },
    currentTestId: {
        type: String,
        default: null
    },
    currentTestSubjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        default: null
    },
    testStartTime: {
        type: Date,
        default: null
    },
    pastTestId: [{
        type: String,
        default: null
    }],
}, {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);