import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import createRoles  from "./libs/initialSetup.js";
import postRoute from './routes/post.routes.js'

import "./database.js";
import { config } from "dotenv";
const app = express();
//createRoles();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});


app.use(cors({
  origin:"*"
}));

app.use(authRoute);
app.use(postRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log("server listening");
});
