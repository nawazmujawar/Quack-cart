const mongoose = require("mongoose")
const Product = require("../models/products")
const Order = require("../models/orders")


exports.order_get_all = (req, res, next) => {
    Order.find()
        .populate('product')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                allOrders: docs.map(singleOrder => {
                    return {
                        _id: singleOrder._id,
                        product: singleOrder.product,
                        quantity: singleOrder.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + singleOrder._id
                        }
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.order_post = (req, res, next) => {

    Product.findById(req.body.productId)
        .exec()
        .then(product => {

            if (!product) {
                res.status(404).json({
                    message: "Product doesn't exists "
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            })
            return order.save()

        })
        .then(result => {
            res.status(201).json({
                message: "Order created!",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/orders/"
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.order_get_single = (req, res, next) => {

    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(result => {
            res.status(200).json({
                _id: result._id,
                product: result.product,
                quantity: result.quantity,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/orders/"
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.order_delete = (req, res, next) => {
    let id = req.params.orderId
    Order.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted successfully!",
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/orders/",
                    body: { productId: "ID", quantity: "Number" }
                }
            })
        })
        .catch(err => {
            error: err
        })
}