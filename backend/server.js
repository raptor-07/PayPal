const app = require('./app');
require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

//connect to mongo database
const connect = mongoose.connect(process.env.DB_CONNECTION_STRING.replace('<password>', process.env.DB_PASSWORD), {
    useNewUrlParser: true
}).then(() => console.log('-----DB connection successful!-----')).catch(err => console.log(err));

//create express server
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const server = app.listen(port, host, () => {
    console.log('server is now running on port ' + port + '...');
    
});



