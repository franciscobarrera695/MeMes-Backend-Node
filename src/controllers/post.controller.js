import Post from '../models/Post.js'

export const getPosts = async(req,res) => {
    try {
        const posts = await Post.find().where('user_id').equals(req.userId)
    res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createPost = async(req,res) => {
 try {
    const {title,image} = req.body
    const post = new Post({
        title,
        image,
        created_at: new Date().getTime(),
        user_id:req.userId,
    })
    await post.save()
    res.json(post)
 } catch (error) {
    res.status(500).json({ message: error.message });
     
 }
}

export const getPostId = async (req,res) => {


} 
export const updatedPost = async(req,res)=>{
   try {
    const id = req.params.id
    const updatePost = await Post.findByIdAndUpdate(id,req.body,{new:true})
    res.status(201).json(updatePost)
   } catch (error) {
    res.status(500).json({ message: error.message });
       
   }
}
export const deletePost = async(req,res)=>{
    try {
        const { id } = req.params;
        const postDeleted = await Post.findByIdAndDelete(id);
        if (!postDeleted) return res.status(404);
        res.status(204);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}