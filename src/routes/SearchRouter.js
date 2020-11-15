const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TutorModel = require('../models/tutor');
const SubjectModel = require('../models/tutor');

router.get('/search', getSearchResults);

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500

async function getSearchResults(request, response, next) {
    try {
        let results = [];
        let searchTerm = request.body.searchTerm.trim();
        console.log("SearchTerm: ", searchTerm);
        let splitTerms = searchTerm.split(' ');
        console.log("Split: ", splitTerms);
        if (splitTerms.length === 1) {
            results = await TutorModel.find({ $and : [
                    { $and : [
                            {addressState: request.body.state},
                            { $or: [
                                    {addressCity: request.body.city},
                                    {addressZipcode: request.body.zipcode},
                                ]},
                        ]},
                    { $or: [
                            {firstName: {$regex: "^" + searchTerm, $options: "i"}},
                            {lastName: {$regex: "^" + searchTerm, $options: "i"}},
                            {courses: {$elemMatch: {title: {$regex: "^" + searchTerm, $options: "i"}}}},
                            {courses: {$elemMatch: {subject: {$regex: "^" + searchTerm, $options: "i"}}}},
                        ]},
                ]}).sort([["rating", 1],["firstName", 1],["lastName", 1],["courses", 1]]).exec();
        } else if (splitTerms.length >= 2) {
            let firstTerm = splitTerms.shift();
            let joinedTermsBySpace = splitTerms.join(" ");
            let joinedTermsByAndFirst = splitTerms.join("&^");
            results = await TutorModel.find({ $and : [
                    { $and : [
                            {addressState: request.body.state},
                            { $or: [
                                    {addressCity: request.body.city},
                                    {addressZipcode: request.body.zipcode},
                                ]},
                        ]},
                    { $or: [
                            { $and : [
                                    {firstName: {$regex: "^" + firstTerm, $options: "i"}},
                                    {lastName: {$regex: "^" + joinedTermsByAndFirst + "|" + joinedTermsBySpace, $options: "i"}},
                                ]},
                            {courses: {$elemMatch: {title: {$regex: "^" + firstTerm + "&^" + joinedTermsByAndFirst + "|" + searchTerm, $options: "i"}}}},
                        ]},
                ]}).sort([["rating", 1],["firstName", 1],["lastName", 1],["courses", 1]]).exec();
        }
        response.statusCode = statusOK;
        response.send(results);
    } catch (e) {
        next(e);
    }
}

module.exports = router;

