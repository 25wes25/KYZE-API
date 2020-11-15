const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const StudentModel = require('../models/student');

router.post('/students', createStudent);
router.put('/students/:id', modifyStudent);
router.get('/students', getAllStudents);
router.get('/students/id/:id', getStudentById);
router.get('/students/email/:email', getStudentByEmail);
router.delete('/students/:id', deleteStudent);

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

async function createStudent(request, response, next) {
    let data = request.body;
    try {
        const student = new StudentModel(data);
        await student.save(function (err, dbRes) {
            if (err) console.error(err);
            response.statusCode = statusOK;
            response.send(new StudentModel(dbRes));
        });
    } catch (e) {
        next(e);
    }
}

async function modifyStudent(request, response, next) {
    let data = request.body;
    try {
        StudentModel.findOneAndUpdate({_id: request.params.id}, data, {new: true}, function (err, dbRes) {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(new StudentModel(dbRes));
        });
    } catch (e) {
        next(e);
    }
}

async function getAllStudents(request, response, next) {
    try {
        let student = await StudentModel.find().exec();
        response.statusCode = statusOK;
        response.send(student);
    } catch (e) {
        next(e);
    }
}

async function getStudentById(request, response, next) {
    try {
        let student = await StudentModel.find({_id: request.params.id}).exec();
        if (student.length >= 1) {
            response.statusCode = statusOK;
            response.send(new StudentModel(student[0]));
        } else {
            response.statusCode = statusError;
            next("No student found for get student by id");
        }
    } catch (e) {
        next(e);
    }
}

async function getStudentByEmail(request, response, next) {
    try {
        let student = await StudentModel.find({email: request.params.email}).exec();
        if (student.length >= 1) {
            response.statusCode = statusOK;
            response.send(student[0]);
        } else {
            response.statusCode = statusError;
            next("No student found for get student by email");
        }
    } catch (e) {
        next(e);
    }
}

async function deleteStudent(request, response, next) {
    try {
        let query = {
            _id: mongoose.Types.ObjectId(request.params.id)
        };
        StudentModel.findOneAndDelete(query, async (err, dbRes) => {
            if (err) return console.error(err);
            try {
                response.statusCode = statusOK;
                response.send(new StudentModel(dbRes));
            } catch (error) {
                response.status(statusError).send(error.message);
            }
        });
    } catch (e) {
        next(e);
    }
}

module.exports = router;

