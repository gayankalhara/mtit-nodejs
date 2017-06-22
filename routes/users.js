let express = require('express');
let User = require('../models/user.model');
let jwt = require('jsonwebtoken');
let config = require('../config.json');
let userRouter = express.Router();

/**
 * Get List of User Documents
 *
 * @return {json} users
 */
userRouter
    .route('/')
    .get(function (request, response) {

        console.log('GET /users');

        User.find({}, (err, docs) => {
            if (err) { return console.error(err); }
            response.json(docs);
        });

    });

/**
 * Insert a New User
 *
 * @return {json} status
 */
userRouter
    .route('/')
    .post(function (request, response) {

        console.log('POST /users');

        const obj = new User(request.body);

        console.log(request.body);
        obj.save((err, item) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                response.status(400).send(err);
            }
            if (err) {
                return console.error(err);
            }
            response.status(200).json(item);
        });

    });

/**
 * Get Users Count
 *
 * @return {json} count
 */
userRouter
    .route('/count')
    .get(function (request, response) {

        console.log('GET /users/count');

        User.count((err, count) => {
            if (err) { return console.error(err); }
            response.json(count);
        });

    });

/**
 * Get User Data by userId
 *
 * @param {String} userId
 * @return {json} status
 */
userRouter
    .route('/:userId')
    .get(function (request, response) {

        console.log('GET /users/:userId');

        let userId = request.params.userId;

        User.findOne({ _id: userId }, (err, obj) => {
            if (err) { return console.error(err); }
            response.json(obj);
        });

    });

/**
 * Update User by userId
 *
 * @param {String} userId
 * @return {json} status
 */
userRouter
    .route('/:userId')
    .put(function (request, response) {

        console.log('PUT /users/:userId');

        let userId = request.params.userId;

        User.findOneAndUpdate({ _id: userId }, request.body, (err) => {
            if (err) { return console.error(err); }
            response.status(200).send();
        });

    });

/**
 * Delete User by userId
 *
 * @param {String} userId
 * @return {json} status
 */
userRouter
    .route('/:userId')
    .delete(function (request, response) {

        console.log('DELETE /users/:userId');

        let userId = request.params.userId;

        User.findOneAndRemove({ _id: userId }, (err) => {
            if (err) { return console.error(err); }
            response.status(200).send();
        });

    });

/**
 * User Login
 *
 * @param {String} userId
 * @return {json} status
 */
userRouter
    .route('/login')
    .post(function (request, response) {

        console.log('POST /users/login');

        let JWT_SECRET = config.jwtSecret;

        User.findOne({ email: request.body.email }, (err, user) => {
            if (!user) {
                console.log('User Not Found');
                return response.status(403).send(err);
            }

            user.comparePassword(request.body.password, (error, isMatch) => {
                console.log('User Found');

                if (!isMatch) {
                    console.log('Password Not Matching!');
                    return response.status(403).send(error);
                }

                console.log('Password Matching!');
                const token = jwt.sign({ user: user }, JWT_SECRET); // , { expiresIn: 10 } seconds
                response.status(200);
                response.json({ token: token });
            });
        });

    });

module.exports = userRouter;