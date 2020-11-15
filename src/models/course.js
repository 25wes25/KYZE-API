const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var courseSchema = new Schema({
    title: String,
    subject: String,
}, {
    toJSON: {
        getters: true,
    },
});

courseSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('course', courseSchema);
