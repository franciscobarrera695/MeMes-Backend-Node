import Post from '../models/Post.js'

export const getPosts = async(req,res) => {
    const posts = await Post.find().where('user_id').equals(req.userId)
    res.json(posts)
}
export const createPost = async(req,res) => {
    const {title,image} = req.body
    const post = new Post({
        title,
        image,
        created_at: new Date().getTime(),
        user_id:req.userId,
    })
    await post.save()
    res.json(post)
}

export const getPostId = async (req,res) => {


} 
export const updatedPost = async(req,res)=>{
    const id = req.params.id
    const updatePost = await Post.findByIdAndUpdate(id,req.body,{new:true})
    res.status(201).json(updatePost)
}
export const deletePost = async(req,res)=>{
    const id = req.params.id
    const publicacion = await Post.findById(id)
    if(!publicacion){
        return res.status(404).json({msg:"No Encontrado"})
    }
    try {
        await publicacion.deleteOne()
        res.json({msg:"Publicacion Eliminada"})
    } catch (error) {
        console.log(error)
    }
}