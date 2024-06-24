/*
Add Jwt auth token in all apis

{
    "email": "user@example.com",
    "username": "example_user",
    "password": "password123"
}

{
    "username": "example_user",
    "password": "password123"
}

{
    "title": "My First Post",
    "content": "This is the content of my first post."
}

{
    "title": "Updated Title",
    "content": "Updated content."
}

{
    "comment": "This is a new comment."
}


Perform data encryption 
*/
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjMzYzFhODY2MzBmMzk1NGM0ZmI0ZjIiLCJpYXQiOjE3MTYxMzQ4NzEsImV4cCI6MTcxNjEzODQ3MX0.N0gIhF9Wv4SiSif90X9Cccac5D0c00tIomxkFNCsl6A
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjMzYzFhODY2MzBmMzk1NGM0ZmI0ZjIiLCJpYXQiOjE3MTYxMzgyODUsImV4cCI6MTcxNjE0MTg4NX0.OVyrPNN0bVmiYNBNCohM4ATG9h2TYoRGrFQTV2SZ230

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/posts.js')
const authRouter = require('./routes/usersAuth.js')

const app = express();
const PORT = process.env.PORT || 3000;

//Data Encryption
require('dotenv').config();


app.use(bodyParser.json());
app.use('/api', authRouter);
app.use('/api/posts', router);

mongoose.connect('mongodb://127.0.0.1:27017/user_auth');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
/*

//Task 1

const userSchema = new mongoose.Schema({
    email: {
        type: String},
    username: {
        type: String},
    password: { 
        type: String}
});

const User = mongoose.model('User', userSchema);
app.use(bodyParser.json());

//Task 1.1
app.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(5, 10));
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        });
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Task 1.2
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Task 1.3
app.post('/api/forget-password', (req, res) => {
    res.json({ message: 'Password reset instructions sent' });
});



//Task 2

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true},
    content: {
        type: String},
    likes: { 
        type: Number, default: 0 },
    comments: 
        [{type: String}]
});

const Post = mongoose.model('Post', postSchema);

//Task 2.2 

//Create 
//Protected Route
app.post('/api/posts', authJWTToken, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
     try{
        const newPost = await post.save()
        res.status(201).send(newPost)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Read

//Get All
//Protected Route
app.get('/api/posts', authJWTToken, async (req, res) => {
    try{
        const posts = await Post.find()
        res.send(posts)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Get by ID
//Protected Route
app.get('/api/posts/:id', authJWTToken, getPost, async (req, res) => {
    try{
        const post = await res.post
        res.send(post)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Update

//Update by ID
//Protected Route
app.patch('/api/posts/:id', authJWTToken, getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title
    }
    if (req.body.content != null) {
        res.post.content = req.body.content
    }
    try{
        const updatedPost = await res.post.save()
        res.status(201).send(updatedPost)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


//Delete

//Delete by ID
//Protected Route
app.delete('/api/posts/:id', authJWTToken, getPost, async(req, res) => {
    try{
        await res.post.deleteOne()
        res.json({message: 'Post Deleted'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getPost(req, res, next) {
    let post
    try{
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({message : 'Post does not exist'})
        }
    } catch (err){
        res.status(500).json({message: err.message})
    }
    res.post = post
    next()
}

//Task 2.3

// Like a post by ID
//Protected Route
app.post('/api/posts/:id/like', authJWTToken, getPost,  async (req, res) => {
    post = await res.post
    try {
        post.likes++;
        await post.save();
        res.json({ message: 'Post liked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a comment to a post by ID
//Protected Route
app.post('/api/posts/:id/comments', authJWTToken, getPost,  async (req, res) => {
    post = await res.post
    try {
        post.comments.push(req.body.comment);
        await post.save();
        res.json({ message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Task 3 - Added authJWTToken function to all routes that require authentication
function authJWTToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
    
    */