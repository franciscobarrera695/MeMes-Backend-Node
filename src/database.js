import mongoose from 'mongoose';
import dotenv from 'dotenv' 
dotenv.config()
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/redsocial',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err))