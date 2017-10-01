const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');
const mongoose = require('mongoose');

// database connection
mongoose.connect(config.uri);

mongoose.connection.on('connected',() =>{
    console.log('connected to database');
});

// port
const port = 3000;

const app = express();

const users = require('./routes/users');

app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

// Index rout
app.get('/',(req,res) =>{
    res.send('Invalid Enpoint');
});

// Start server
app.listen(port, () => {
    console.log('server started on port '+port);
});