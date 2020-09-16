const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
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
