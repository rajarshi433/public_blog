const UserModel = require('../models/User.js');
const PostModel = require('../models/Post.js');

const imagekit = require('../configurations/imagekit.config.js');
const moment = require('moment');


//Creates a new post
const addPost = async (req, res) => {
    const file = req.file.buffer;
    const { title, content, createdBy, createdAt } = req.body;
    const user = await UserModel.findOne({ uid: createdBy });

    try {
        const image = await imagekit.upload({
            file: file,
            fileName: req.file.originalname,
            folder: '/uploads',
            tags: ["tag1", "tag2"]
        });

        const imageUrl = imagekit.url({
            path: image.filePath,
            transformation: [
                {
                    width: 500,
                    aspectRatio: 4 / 3,
                    quality: 70,
                },
            ],
        });

        const postData = {
            title: title,
            content: content,
            banner: imageUrl,
            createdBy: user._id,
            createdAt: createdAt
        }

        const post = new PostModel(postData);
        const result = await post.save();
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }
}

//Fetch random posts
const fetchRandomPosts = async (req, res) => {
    try {
        // const randomPosts = await PostModel.find().limit(6).populate('createdBy');
        const randomPosts = await PostModel.aggregate([
            { $sample: { size: 6 } },
            { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'createdBy' } },
            { $unwind: '$createdBy' },
        ]);
        res.status(200).json(randomPosts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
}

//Fetch filtered posts
const fetchFilteredPosts = async (req, res) => {
    try {
        const skip = req.params.skip;

        const suggestedPosts = await PostModel.find().skip(skip).limit(3).populate('createdBy');
        const totalPosts = await PostModel.countDocuments()
        res.status(200).json({ suggestedPosts, totalPosts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
}

//Fetch post by id
const fetchPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostModel.findOne({ _id: id }).populate('createdBy');
        res.status(200).json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching post' });
    }
}

//Fetch user posts
const fetchUserPosts = async (req, res) => {
    try {
        const id = req.params.id;
        const skip = req.params.skip;
        const limit = req.params.limit;

        const posts = await PostModel.find({ createdBy: id }).skip(skip).limit(limit).populate('createdBy');
        const totalPosts = await PostModel.countDocuments({ createdBy: id })
        res.status(200).json({ posts, totalPosts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
}

//Deletes a post
const deletePost = async (req, res) => {
    try {
        const result = await PostModel.deleteOne({ _id: req.params.id })
        res.status(200).json(result)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting post' });
    }
}

//Searches post by query
const searchPost = async (req, res) => {
    try {
        const query = req.params.query;
        const result = await PostModel.find({ title: { $regex: new RegExp(query, 'i') } }).populate('createdBy')
        res.status(200).json(result)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting search results' });
    }
}


module.exports = {
    addPost,
    fetchRandomPosts,
    fetchFilteredPosts,
    fetchPostById,
    fetchUserPosts,
    deletePost,
    searchPost,
};