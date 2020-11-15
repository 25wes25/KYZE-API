const mongoose = require('mongoose');
const moment = require('moment');
const url = 'mongodb://127.0.0.1:27017/kyze';

const { ALL_COURSES } = require('../constants');

// Connect to MongoDB server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected: ', url)
});

db.on('error', err => {
    console.error('Connection error: ', err)
});

const CoursesModel = require('../src/models/course');

for (let i = 0; i < ALL_COURSES.length; i++) {
    let course = new CoursesModel(ALL_COURSES[i]);
    course.save(async (err, dbRes) => {
        if (err) return console.error(err);
    });
}
