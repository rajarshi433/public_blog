const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    banner: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    createdAt: { type: String },
});


module.exports = mongoose.model('posts', PostSchema);