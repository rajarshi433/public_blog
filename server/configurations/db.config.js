const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.DB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(dbURI).then(() => {
    console.log('Connection Successful')
}).
    catch((err) => {
        console.log('No connection')
        console.log(err)
    })
