const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./db');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');



app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Handling CORS
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header(
            "Access-Control-Allow-Methods",
            "GET,PUT,POST,PATCH,DELETE"
        );
        return res.status(200).json({});
    }
    next();
});

//Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

//Error Handling
app.use((req,res,next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

//Error Handling from other files
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = app;