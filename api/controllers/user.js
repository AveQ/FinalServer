const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const UserController = require('../controllers/user');
const mail = require("@sendgrid/mail");

// GET ALL
exports.users_get_all = (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            const respone = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        id: doc._id,
                        nick: doc.nick,
                        email: doc.email,
                        weight: doc.weight
                    }
                }
                )
            }
            console.log(docs);
            res.status(200).json(respone);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


// SIGNIN USER
exports.users_signin = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(
            user => {
                // sprawdz czy istnieje uzytkownik o tym email
                if (user.length < 1) {
                    // UNAUTHORIZED
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    // jeżeli error wystapi zwroc status -401
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                // czas wygasniecia
                                expiresIn: "1h"
                            }
                        );

                        // jeżeli hasła się zgadzają zwróc status - 200
                        return res.status(200).json({
                            message: 'Auth successfull',
                            email: user[0].email,
                            token: token,
                            expirationDate: 3600,
                            user: {
                                nick: user[0].nick,
                                id: user[0]._id,
                                name: user[0].name,
                                weight: user[0].weight,
                                height: user[0].height,
                                gender: user[0].gender,
                                weeklyChange: user[0].weeklyChange,
                                country: user[0].country,
                                age: user[0].age,
                                language: user[0].language,
                                forecast: user[0].forecast,
                                target: user[0].target,
                                userFavExercises: user[0].userFavExercises,
                                startingWeight: user[0].weight,
                                finalWeight: user[0].finalWeight,
                                counterSignIn: user[0].counterSignIn,
                                ppm: user[0].ppm,
                                cpm: user[0].cpm,
                                physicalActivity: user[0].physicalActivity,
                                isAdmin: user[0].isAdmin,
                                isRated: user[0].isRated
                            }
                        })
                    }
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                });
            }
        )
        .catch(
            err => {

                res.status(500).json({
                    error: err
                });
            }
        )
}

// GET USER
exports.users_get_user = (req, res, next) => {
    User
        .findOne({ id: req.body.userId })
        .exec()
        .then(user => {
            console.log(user)
            res.status(200).json({
                user: {
                    id: user._id,
                    nick: user.nick,
                    email: user.email,
                    weight: user.weight,
                    height: user.height,
                    gender: user.gender,
                    weeklyChange: user.weeklyChange,
                    country: user.country,
                    age: user.age,
                    language: user.language,
                    target: user.target,
                    forecast: user.forecast,
                    userFavExercises: user.userFavExercises,
                    startingWeight: user.weight,
                    finalWeight: user.finalWeight,
                    counterSignIn: user.counterSignIn,
                    ppm: user.ppm,
                    cpm: user.cpm,
                    physicalActivity: user.physicalActivity,
                    isAdmin: user.isAdmin,
                    isRated: user.isRated
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// SIGNUP USER
exports.users_signup_user = (req, res, next) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                // CONFLICT - 409
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        if (req.body.email) {
                            var transport = nodemailer.createTransport({
                                service: 'Gmail',
                                secure: false,
                                auth: {
                                    user: 'nflcenter2021@gmail.com',
                                    pass: 'NFLCenter123!'
                                },
                                tls: {
                                    rejectUnauthorized: false
                                }
                            })
                            var mailOpt = {
                                to: req.body.email,
                                from: 'nflcenter@gmail.com',
                                subject: 'Witaj w NFL-Center!',
                                text: `
                                Cześć!
                                Miło nam Cię powitać w NFL-Center :)! Pamiętaj o uzupełnieniu danych personalnych w zakładce UŻYTKOWNIK. Dzięki temu będziesz mógł
                                cieszyć się pełnymi możliwościami serwisu. Jeżeli chcesz przejść do panelu UŻYTKOWNIK błyskawicznie - kliknij na link poniżej.
                    
                                https://nfl-center-gui.herokuapp.com/settings
                    
                                Życzymy samych sukcesów,
                                NFL-Center`
                            }
                            transport.sendMail(mailOpt, (err) => {console.log(err)})
                        }
                        // wyslij przywitalnego maila
                        user
                            .save()
                            .then(
                                result => {
                                                console.log(result);
                                                res.status(201).json({
                                                    message: "User created and Email has been send"
                                                })
                                        }
                            )
                            .catch(
                                err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                }
                            );
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

// DELETE USER
exports.users_delete_user = (req, res, next) => {
    User
        .remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            console.log('User deleted. _id = ' + req.params.userId)
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

//PATCH USER
exports.users_patch_user = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User
        .update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}