const UserModel = require('../models/User.js');


//Adds a new Bookmark to the user
const addBookmark = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;

        const user = await UserModel.findOne({ _id: userId })
        const isPresent = user.bookmarks.includes(postId);

        if (!isPresent) {
            const result = await UserModel.updateOne({ _id: userId }, { $push: { bookmarks: postId } })
            res.status(200).json(result)
        }
        else {
            res.json("Already bookmarked")
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding bookmark' });
    }
}

//Removes a bookmark from the user
const removeBookmark = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;

        await UserModel.updateOne(
            { _id: userId },
            { $pull: { bookmarks: postId } }
        );
        res.status(200).json('Bookmark removed successfully')
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing bookmark' });
    }
}

//Fetches all the bookmarks of the user
const fetchBookmarks = async (req, res) => {
    try {
        const result = await UserModel.findOne({ _id: req.params.userId })
        res.status(200).json(result.bookmarks)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching bookmarks' });
    }
}


module.exports = {
    addBookmark,
    removeBookmark,
    fetchBookmarks
};