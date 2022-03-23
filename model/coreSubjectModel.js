import mongoose from 'mongoose';
const { Schema } = mongoose;

const coreSubject = new Schema({
    title: String,
    desc: String,
    hidden: Boolean,
}, {
    timestamps: true,
});