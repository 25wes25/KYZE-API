const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TutorModel = require('../models/tutor');

router.post('/tutors', createTutor);
router.put('/tutors/:id', modifyTutor);
router.get('/tutors', getAllTutors);
router.get('/tutors/id/:id', getTutorById);
router.get('/tutors/email/:email', getTutorByEmail);
router.delete('/tutors/:id', deleteTutor);

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

async function createTutor(request, response, next) {
    let data = request.body;
    try {
        const tutor = new TutorModel(data);
        await tutor.save(function (err, dbRes) {
            if (err) console.error(err);
            response.statusCode = statusOK;
            response.send(new TutorModel(dbRes));
        });
    } catch (e) {
        next(e);
    }
}

async function modifyTutor(request, response, next) {
    let data = request.body;
    try {
        TutorModel.findOneAndUpdate({_id: request.params.id}, data, {new: true}, function (err, dbRes) {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(new TutorModel(dbRes));
        });
    } catch (e) {
        next(e);
    }
}

async function getAllTutors(request, response, next) {
    try {
        let tutor = await TutorModel.find().exec();
        response.statusCode = statusOK;
        response.send(tutor);
    } catch (e) {
        next(e);
    }
}

async function getTutorById(request, response, next) {
    try {
        let tutor = await TutorModel.find({_id: request.params.id}).exec();
        if (tutor.length >= 1) {
            response.statusCode = statusOK;
            response.send(new TutorModel(tutor[0]));
        } else {
            response.statusCode = statusError;
            next("No tutor found for get tutor by id");
        }
    } catch (e) {
        next(e);
    }
}

async function getTutorByEmail(request, response, next) {
    try {
        let tutor = await TutorModel.find({email: request.params.email}).exec();
        if (tutor.length >= 1) {
            response.statusCode = statusOK;
            response.send(tutor[0]);
        } else {
            response.statusCode = statusError;
            next("No tutor found for get tutor by email");
        }
    } catch (e) {
        next(e);
    }
}

async function deleteTutor(request, response, next) {
    try {
        let query = {
            _id: mongoose.Types.ObjectId(request.params.id)
        };
        TutorModel.findOneAndDelete(query, async (err, dbRes) => {
            if (err) return console.error(err);
            try {
                response.statusCode = statusOK;
                response.send(new TutorModel(dbRes));
            } catch (error) {
                response.status(statusError).send(error.message);
            }
        });
    } catch (e) {
        next(e);
    }
}

module.exports = router;

