const PORT = process.env.PORT || 8000;

require('./configurations/db.config.js');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const userController = require('./controllers/user.controller.js');
const postController = require('./controllers/post.controller.js');
const bookmarkController = require('./controllers/bookmark.controller.js');
const followingController = require('./controllers/following.controller.js');

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8000', 'blogmate.onrender.com']
}));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadMiddleware = multer();


// @route - Login User
app.post('/login', userController.loginUser)

//@route - Get user id
app.get('/getid/:uid', userController.getUserId)

//@route - Fetch User by Id
app.get('/fetchuser/:id', userController.fetchUserById)

//@route - Fetch User Profle
app.get('/fetchmyprofile/:id', userController.fetchUserProfile)

//@route - Fetch 5 Users
app.get('/fetchusers', userController.fetchUsers)

//@route - Add User Bio
app.put('/addbio/:id', userController.addBio)



// @route - Add Post
app.post('/addpost', uploadMiddleware.single('banner'), postController.addPost)

// @route - Fetch Random Posts
app.get('/fetchrandomposts', postController.fetchRandomPosts)

//@route - Fetch Filtered Posts
app.get('/fetchfilteredposts/:skip', postController.fetchFilteredPosts)

//@route - Fetch Post by Id
app.get('/fetchpost/:id', postController.fetchPostById)

//@route - Fetch User Posts
app.get('/fetchuserposts/:id/:limit/:skip', postController.fetchUserPosts)

//@route - Delete Post
app.delete('/deletepost/:id', postController.deletePost)

//@route - Search Post
app.get('/search/:query', postController.searchPost)



//@route - Add Bookmark
app.patch('/addbookmark/:userId/:postId', bookmarkController.addBookmark)

//@route - Remove Bookmark
app.patch('/removebookmark/:userId/:postId', bookmarkController.removeBookmark)

//@route - Fetch All Bookmarks
app.get('/fetchbookmarks/:userId', bookmarkController.fetchBookmarks)



//@route - Add Following
app.patch('/addfollowing/:ferId/:fingId', followingController.addFollowing)

//@route - Remove Following
app.patch('/removefollowing/:ferId/:fingId', followingController.removeFollowing)

//@route - Fetch User Followings
app.get('/fetchfollowing/:ferId', followingController.fetchUserFollowings)

module.exports = app;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));