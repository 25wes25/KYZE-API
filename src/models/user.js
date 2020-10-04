const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var subjectSchema = new Schema({
    subjectId: String,
    enabled: Boolean,
    price: Number
});

var educationSchema = new Schema({
    college: String,
    degree: String
});

var userSchema = new Schema({
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
    password: String,
    subjects: [subjectSchema],
    education: [educationSchema],
    cancellationPolicy: Number,
    currentLocationRadius: Number,
    homeLocationRadius: Number,
    profileHeadline: String,
    profileBio: String
},{
    toJSON: {
        getters: true,
    },
});

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('user', userSchema);
