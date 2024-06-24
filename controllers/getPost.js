module.exports = async function getPost(req, res, next) {
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