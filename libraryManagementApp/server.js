const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

mongoose.connect(process.env).then(() => 
    console.log('Database connected'))
    .catch(err => 
        console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use (session ({
    secret: process.env.SECRET,
    resave: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
}));

app.use('/', require('./routes/authRoutes'));
app.use('/books', require('./routes/bookRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));