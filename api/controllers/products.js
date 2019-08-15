const mongoose = require('mongoose');
const Product = require('../models/product');
require('dotenv').config();

exports.get_all_products = (req,res,next) => {
    Product.find()
    .select('name price _id imagePath')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    imagePath: doc.imagePath,
                    url: process.env.SITE_URL+'products/'+doc._id
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
}

exports.create_product = (req,res,next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        imagePath: req.file.path
    });
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Product created',
            product: {
                name: result.name,
                price: result.price,
                _id: result._id,
                imagePath: result.imagePath
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });

    
}

exports.get_product_by_id = (req,res,next) => {
    const id = req.params.id;
    Product.findById(id)
    .select('name price _id imagePath')
    .exec()
    .then(doc => {
        console.log('Form database', doc);
        if(doc){
            res.status(200).json({
                product: doc
            });
        } else {
            res.status(404).json({
                message: 'no data found'
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
}

exports.update_product = (req,res,next) => {
    const id = req.params.id;
    
    Product.update({_id:id}, {$set: {
        name: req.body.name,
        price: req.body.price
    }})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated',
            product: {
                name: result.name,
                price: result.price,
                _id: result._id,
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
}

exports.delete_product = (req,res,next) => {
    const id = req.params.id;
    Product.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
}