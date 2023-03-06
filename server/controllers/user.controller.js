const UserModel = require('../models/User.js');


//Logs in new user
const loginUser = async (req, res) => {
    try {
        const { uid, displayName, photoURL } = req.body;

        const userData = {
            uid: uid,
            displayName: displayName,
            photoURL: photoURL,
            about: '',
            following: [],
            followers: [],
            bookmarks: [],
            joinedOn: new Date().toLocaleString(),
        }

        const isUser = await UserModel.findOne({ uid: uid })
        // res.json(isUser)
        if (isUser === null) {
            const user = new UserModel(userData);
            const result = await user.save();
            res.status(200).json(result);
        }
        else {
            res.json("User already exists");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
}

//Get user id
const getUserId = async (req, res) => {
    uid = req.params.uid;

    const user = await UserModel.findOne({ uid: uid })
    res.status(200).json(user._id)
}

//Fetches user by id
const fetchUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findOne({ _id: id })
            .populate('following')
            .populate('followers')
            .populate({
                path: 'bookmarks',
                populate: {
                    path: 'createdBy',
                    model: 'users'
                }
            });
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
}


//Fetches user profile
const fetchUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findOne({ _id: id }).populate('following')
            .populate('followers')
            .populate({
                path: 'bookmarks',
                populate: {
                    path: 'createdBy',
                    model: 'users'
                }
            });
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
}


//Fetches users
const fetchUsers = async (req, res) => {
    try {
        const result = await UserModel.find().limit(5)
        res.status(200).json(result)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}


//Adds a user bio
const addBio = async (req, res) => {
    try {
        const { about } = req.body
        const result = await UserModel.updateOne({ _id: req.params.id }, { about: about })
        res.status(200).json(result)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding bio' });
    }
}


module.exports = {
    loginUser,
    getUserId,
    fetchUserById,
    fetchUserProfile,
    fetchUsers,
    addBio,
};