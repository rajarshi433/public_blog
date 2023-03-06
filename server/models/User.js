const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    photoURL: { type: String, required: true },
    about: { type: String },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    joinedOn: { type: String },
});


module.exports = mongoose.model('users', UserSchema);