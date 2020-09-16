const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserModel = require('../models/user');

router.post('/users', createUser);
router.put('/users/:id', modifyUser);
router.get('/users', getAllUsers);
router.get('/users/id/:id', getUserById);
router.get('/users/email/:email', getUserByEmail);
router.delete('/users/:id', deleteUser);

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

async function createUser(request, response, next) {
    let data = request.body;
    try {
        const user = new UserModel(data);
        await user.save(function (err, dbRes) {
            if (err) console.error(err);
            response.statusCode = statusOK;
            response.send(new UserModel(dbRes));
        });
    } catch (e) {
        next(e);
    }
}

async function modifyUser(request, response, next) {
    let data = request.body;
    try {
        UserModel.findOneAndUpdate({_id: request.params.id}, data, {new: true}, function (err, dbRes) {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(new UserModel(dbRes));
        });
    } catch (e) {
        next(e);
    }
}

async function getAllUsers(request, response, next) {
    try {
        let user = await UserModel.find().exec();
        response.statusCode = statusOK;
        response.send(user);
    } catch (e) {
        next(e);
    }
}

async function getUserById(request, response, next) {
    try {
        let user = await UserModel.find({_id: request.params.id}).exec();
        if (user.length >= 1) {
            response.statusCode = statusOK;
            response.send(new UserModel(user[0]));
        } else {
            response.statusCode = statusError;
            next("No user found for get user by id");
        }
    } catch (e) {
        next(e);
    }
}

async function getUserByEmail(request, response, next) {
    try {
        let user = await UserModel.find({email: request.params.email}).exec();
        if (user.length >= 1) {
            response.statusCode = statusOK;
            response.send(user[0]);
        } else {
            response.statusCode = statusError;
            next("No user found for get user by email");
        }
    } catch (e) {
        next(e);
    }
}

async function deleteUser(request, response, next) {
    try {
        let query = {
            _id: mongoose.Types.ObjectId(request.params.id)
        };
        UserModel.findOneAndDelete(query, async (err, dbRes) => {
            if (err) return console.error(err);
            try {
                response.statusCode = statusOK;
                response.send(new UserModel(dbRes));
            } catch (error) {
                response.status(statusError).send(error.message);
            }
        });
    } catch (e) {
        next(e);
    }
}

module.exports = router;

