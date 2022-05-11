import Post from '../models/Post.js'
import {uploadImage,deleteImage} from "../libs/cloudinary.js"
import fs from "fs-extra"


export const getPosts = async(req,res) => {
    try {
        const posts = await Post.find().where('user_id').equals(req.userId.id)
    res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createPost = async(req,res) => {
    const {title} = req.body
    try {

   
    let image;
    if(req.files?.image){
      const result = await uploadImage(req.files.image.tempFilePath)
      image={
        url:result.secure_url,
        public_id:result.public_id
      }
      await fs.remove(req.files.image.tempFilePath)
    }
    const postSaved = new Post({ 
        title, 
        image,
        created_at: new Date().getTime(),
        user_id:req.userId.id,
        user_name:req.userId.name
    });
    await postSaved.save();
    res.json(postSaved)
 } catch (error) { 
     console.log(error)
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
        const postDeleted = await Post.findById(id);
           if (!postDeleted) return res.sendStatus(404);
        await postDeleted.deleteOne()
        if(postDeleted.image.public_id){
          await deleteImage(postDeleted.image.public_id)
        }
        res.status(204);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


export const getPostsGlobal = async(req,res) => {
  try {
      const posts = await Post.find().where('user_id')

  res.json(posts)
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}