const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://testeval:LHbWIQTaWODGqTZG@cluster0.bqzyz.mongodb.net/testeval?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', () => {
    console.log('Connected to Mongodb');
})

module.exports = db;
