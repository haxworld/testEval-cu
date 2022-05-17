const mongoose = require('mongoose');
mongoose.connect('mongooselink');

const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', () => {
    console.log('Connected to Mongodb');
})

module.exports = db;
