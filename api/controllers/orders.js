const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


exports.get_all_orders = (req,res,next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    product: doc.product,
                    quantity: doc.quantity,
                    _id: doc._id,
                    url: 'http://localhost:3000/orders/'+doc._id
                }
            })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
}

exports.create_order = (req,res,next) => {
    Product.findById(req.body.productId)
    .exec()
    .then(product => {
        if(!product){
            return res.status(404).json({
                message: 'product not found'
            });
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            productId: req.body.productId,
            quantity: req.body.quantity
        });
        return order.save();
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Order created',
            order: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
}

exports.get_order_by_id = (req,res,next) => {
    const id = req.params.id;
    Order.findById(id)
    .select('product quantity _id')
    .populate('product')
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

exports.delete_order = (req,res,next) => {
    const id = req.params.id;
    Order.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
}