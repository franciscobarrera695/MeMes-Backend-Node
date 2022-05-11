import User from "../models/User.js";
import jwt from "jsonwebtoken";
//import Role from "../models/Role.js";

import {uploadImageProfile} from "../libs/cloudinary.js"
import fs from "fs-extra"



export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

 /* if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });

    user.roles = [role._id];
  }*/
  user.password = await user.encryptPassword(user.password);

  await user.save();

  res.status(201).json({ user, message: "create user success" });
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("user not found" );
  }
  const comparePassword = await user.validatePassword(password)
  if(!comparePassword){
    return res.status(404).send( "password not found" );
  }
  
  
  const token = jwt.sign({ id: user._id ,name:user.name}, "secret", {
    expiresIn: 60 * 60 * 24,
  });
  res.status(200).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    password,
    token,
    roles:user.roles
  });
  } catch (error) {
    console.log(error)
  }
 
};

export const list = async (req, res) => {
  const user = await User.find();
  res.json(user);
};
export const me = async (req, res) => {
  const user = await User.findById(req.userId.id);
  
  if (!user) {
    return res.status(404).send("No User Found");
  }
  res.json(user);
};


export const updateProfile = async (req,res) => {
  const user = await User.findById(req.params.id)
  if(!user){
    return res.status(400).json({msg:"hubo un error"})
  }
  const {email} = req.body
  if(user.email !== email){
    const existingEmail = await User.findOne({email})
    if(existingEmail){
      return res.status(400).json({msg:'Email ya en uso'})
    }
  }
  try {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    //user.phone = req.body.phone || user.phone
    const updateUser = await user.save()
    res.json(updateUser)
  } catch (error) {
    console.log(error)
  }
}

export const updatePassword = async(req,res) => {
  //leer los datos
const {password_actual,password_nuevo} = req.body
  //comprobar que el veterinario exista
  const user = await User.findById(req.userId.id)
  if(!user){
    return res.status(400).json({msg:"hubo un error"})
  }
  //comprobar su password
  if(await user.validatePassword(password_actual)){
  
    user.password = await user.encryptPassword(password_nuevo)

    await user.save()
    res.json({msg:'Password Guardado Correctamente'})
  }else{
    return res.status(400).json({msg:'El Password Actual es Incorrecto'})
  }
  //almacenar el nuevo password
}
export const updateImageProfile = async(req,res) =>{
  let image;
  const user = await User.findById(req.userId.id)
  if(!user){
    return res.status(400).json({msg:"hubo un error"})
  }
    if(!req.files){
      return res.status(400).json({msg:"hubo un error"})
    }
    if(req.files.image){
      const result = await uploadImageProfile(req.files.image.tempFilePath)
      image={
        url:result.secure_url,
        public_id:result.public_id
      }
      await fs.remove(req.files.image.tempFilePath)
    }
    user.image = image
    await user.save()
}