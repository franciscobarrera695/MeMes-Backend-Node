import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const {Schema,model} = mongoose

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   /* roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],*/
  },
  {
    versionKey: false,
  }
);

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function async(password) {
  return bcrypt.compare(password, this.password);
};

export default model("User", userSchema);
