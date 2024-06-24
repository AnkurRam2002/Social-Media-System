const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const getPost = require('../controllers/getPost.js')
const authJWTToken = require('../controllers/auth.js')

//Create 
//Protected Route
router.post('/posts', authJWTToken, async (req, res) => {
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

//Get All
//Protected Route
router.get('/', authJWTToken, async (req, res) => {
    try{
        const posts = await Post.find()
        res.send(posts)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Get by ID
//Protected Route
router.get('/:id', authJWTToken, getPost, async (req, res) => {
    try{
        const post = await res.post
        res.send(post)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Update by ID
//Protected Route
router.patch('/:id', authJWTToken, getPost, async (req, res) => {
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

//Delete by ID
//Protected Route
router.delete('/:id', authJWTToken, getPost, async(req, res) => {
    try{
        await res.post.deleteOne()
        res.json({message: 'Post Deleted'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// Like a post by ID
//Protected Route
router.post('/:id/like', authJWTToken, getPost,  async (req, res) => {
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
router.post('/:id/comments', authJWTToken, getPost,  async (req, res) => {
    post = await res.post
    try {
        post.comments.push(req.body.comment);
        await post.save();
        res.json({ message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router