const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express()

//use express.json to get data into json format
app.use(express.json());


//Port
const PORT = process.env.PORT || 5000;

//use cors
app.use(cors())

//importing Route
const TodoItemRoute = require('./routes/todoitems')

//connection to database
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database Connected"))
.catch(err => console.log(err))

app.use('/', TodoItemRoute);

//Add port and connect to server
app.listen(PORT, ()=> console.log("Server Connected"));
