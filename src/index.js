const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Routes
app.use('/api/tasks', require('./routes/task_routes.js'));


// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
async function init(){
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
}

init();