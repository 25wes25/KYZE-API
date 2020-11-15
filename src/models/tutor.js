const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var tutoredSubjectSchema = new Schema({
    title: String,
    subject: String,
    courseId: String,
    enabled: Boolean,
    price: Number
}, {
    toJSON: {
        getters: true,
    },
});

tutoredSubjectSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

var educationSchema = new Schema({
    college: String,
    degree: String
}, {
    toJSON: {
        getters: true,
    },
});

educationSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

var tutorSchema = new Schema({
    firstName: String,
    lastName: String,
    sex: String,
    dob: Date,
    phone: String,
    email: String,
    addressStreet: String,
    addressAptnum: String,
    addressCity: String,
    addressState: String,
    addressZipcode: String,
    subjects: [tutoredSubjectSchema],
    education: [educationSchema],
    cancellationPolicy: Number,
    currentLocationRadius: Number,
    homeLocationRadius: Number,
    profileHeadline: String,
    profileBio: String,
    rating: Number
},{
    toJSON: {
        getters: true,
    },
});

tutorSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('tutor', tutorSchema);
