const mongoose = require('mongoose')
const { Schema } = mongoose
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    favoriteGenre: {
        type: String
    },
    favoriteBook: {
        type: String
    },
    favoriteAuthor: {
        type: String
    },
    description: {
        type: String
    },
    bookList: {
        type: Array
    },
    booksFinished: {
        type: Array
    },
    background: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;