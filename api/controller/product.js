const mongoose = require("mongoose")
const Product = require("../models/products")

exports.product_get_all = (req, res, next) => {
    Product.find()
        // .select(" name price _id ")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map((doc) => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: 'https://quackcart-api.herokuapp.com/products/' + doc._id
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

exports.product_post = (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(doc => {
        console.log(doc)
        res.status(201).json({
            message: "Created product successfully",
            createdProduct: {
                _id: doc._id,
                name: doc.name,
                price: doc.price,
                request: {
                    type: 'GET',
                    url: 'https://quackcart-api.herokuapp.com/products/'
                }
            }
        })
    }
    ).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.product_get_single = (req, res, next) => {
    let id = req.params.productId
    Product.findById({ _id: id })
        .exec()
        .then(doc => {
            res.status(200).json({
                _id: doc._id,
                name: doc.name,
                price: doc.price,
                request: {
                    type: 'GET',
                    url: 'https://quackcart-api.herokuapp.com/products/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.product_patch = (req, res, next) => {
    let id = req.params.productId
    const productOps = {}
    for (const ops of req.body) {
        productOps[ops.propName] = ops.value
    }
    Product.update({ _id: id }, { $set: productOps })
        .exec()
        .then(result => {
            const response = {
                message: "Product is Updated!",
                updatedProduct: {

                    request: {
                        type: 'GET',
                        url: 'https://quackcart-api.herokuapp.com/products/' + id
                    }
                }
            }
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.product_delete = (req, res, next) => {
    let id = req.params.productId
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Successfully Deleted!",
                request: {
                    type: 'POST',
                    url: 'https://quackcart-api.herokuapp.com/products/',
                    body: { name: "String", price: "Number" }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}