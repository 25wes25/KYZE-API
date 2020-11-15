const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var studentSchema = new Schema({
    firstName: String,
    lastName: String,
    sex: String,
    dob: Date,
    phone: String,
    email: String,
    addressState: String,
    addressZipcode: String,
},{
    toJSON: {
        getters: true,
    },
});

studentSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('student', studentSchema);
