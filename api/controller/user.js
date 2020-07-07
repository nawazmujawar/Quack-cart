const bcrypt = require("bcrypt")
const User = require("../models/users")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })  //   check wheather email already exits in DB or not
        .exec()
        .then(user => {
            if (user.length >= 1) {           // if email already exists send error           
                return res.status(409).json({
                    message: "Mail already exits"
                })
            }
            else {                              // else create user
                bcrypt.hash(req.body.password, 10, (err, hash) => {   // first encrypt password
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({              // then create the user
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                            .save()
                            .then(user => {
                                console.log(user)
                                res.status(201).json({
                                    message: "User created!"
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })

}

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed"
                    })
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );

                    return res.status(200).json({
                        message: "Auth Success!",
                        token: token
                    })
                }
                res.status(401).json({
                    message: "Auth Failed"
                })
            })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Deleted!"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}