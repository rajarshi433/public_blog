const UserModel = require('../models/User.js');


//Adds a new Follower and Following
const addFollowing = async (req, res) => {
    try {
        const ferId = req.params.ferId;
        const fingId = req.params.fingId;

        const follower = await UserModel.findOne({ _id: ferId })
        const isPresent = follower.following.includes(fingId);

        if (!isPresent) {
            const followed = await UserModel.updateOne({ _id: ferId }, { $push: { following: fingId } })
            const followedBy = await UserModel.updateOne({ _id: fingId }, { $push: { followers: ferId } })
            res.status(200).json({ followed: followed, followedBy: followedBy })
        }
        else {
            res.json("Already following the user")
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error following the user' });
    }
}

//Removes a Follower and Following
const removeFollowing = async (req, res) => {
    try {
        const ferId = req.params.ferId;
        const fingId = req.params.fingId;

        const unFollowed = await UserModel.updateOne({ _id: ferId }, { $pull: { following: fingId } });
        const unFollowedBy = await UserModel.updateOne({ _id: fingId }, { $pull: { followers: ferId } });
        res.status(200).json({ unFollowed: unFollowed, unFollowedBy: unFollowedBy })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error unfollowing the user' });
    }
}

//Fetches all the user followings
const fetchUserFollowings = async (req, res) => {
    try {
        const result = await UserModel.findOne({ _id: req.params.ferId })
        res.status(200).json(result.following)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching followings' });
    }
}


module.exports = {
    addFollowing,
    removeFollowing,
    fetchUserFollowings
};