const app = require('./app');
require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

//connect to mongo database
const connect = mongoose.connect(process.env.DB_CONNECTION_STRING.replace('<password>', process.env.DB_PASSWORD), {
    useNewUrlParser: true
}).then(() => console.log('-----DB connection successful!-----')).catch(err => console.log(err));




