import mongoose from "mongoose";


const {Schema,model} = mongoose
const postSchema = new Schema({
  title: String,
  image: String,
  created_at: {
    type:Date,
    default:Date.now()
  },
  user_id: { ref: "User", type: Schema.Types.ObjectId }
},{
  versionKey:false
});

export default model('Post',postSchema)