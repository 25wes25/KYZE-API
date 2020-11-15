const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var tutoredSubjectSchema = new Schema({
    title: String,
    subjectId: String,
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

module.exports = mongoose.model('tutoredSubject', tutoredSubjectSchema);
