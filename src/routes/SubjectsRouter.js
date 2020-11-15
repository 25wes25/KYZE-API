const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const CourseModel = require('../models/course');

router.post('/courses', createCourse);
router.put('/courses/:id', modifyCourse);
router.get('/courses', getAllCourses);
router.get('/courses/id/:id', getCourseById);
router.delete('/courses/:id', deleteCourse);

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

async function createCourse(request, response, next) {
    let data = request.body;
    try {
        const course = new CourseModel(data);
        await course.save(function (err, dbRes) {
            if (err) console.error(err);
            response.statusCode = statusOK;
            response.send(new CourseModel(dbRes));
        });
    } catch (e) {
        next(e);
    }
}

async function modifyCourse(request, response, next) {
    let data = request.body;
    try {
        CourseModel.findOneAndUpdate({_id: request.params.id}, data, {new: true}, function (err, dbRes) {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(new CourseModel(dbRes));
        });
    } catch (e) {
        next(e);
    }
}

async function getAllCourses(request, response, next) {
    try {
        let course = await CourseModel.find().exec();
        response.statusCode = statusOK;
        response.send(course);
    } catch (e) {
        next(e);
    }
}

async function getCourseById(request, response, next) {
    try {
        let course = await CourseModel.find({_id: request.params.id}).exec();
        if (course.length >= 1) {
            response.statusCode = statusOK;
            response.send(new CourseModel(course[0]));
        } else {
            response.statusCode = statusError;
            next("No course found for get course by id");
        }
    } catch (e) {
        next(e);
    }
}

async function deleteCourse(request, response, next) {
    try {
        let query = {
            _id: mongoose.Types.ObjectId(request.params.id)
        };
        CourseModel.findOneAndDelete(query, async (err, dbRes) => {
            if (err) return console.error(err);
            try {
                response.statusCode = statusOK;
                response.send(new CourseModel(dbRes));
            } catch (error) {
                response.status(statusError).send(error.message);
            }
        });
    } catch (e) {
        next(e);
    }
}

module.exports = router;

