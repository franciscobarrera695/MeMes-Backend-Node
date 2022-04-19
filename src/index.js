import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import createRoles  from "./libs/initialSetup.js";
import postRoute from './routes/post.routes.js'

import "./database.js";
import { config } from "dotenv";
const app = express();
createRoles();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(authRoute);
app.use(postRoute)

app.listen(5000, () => {
  console.log("server listening");
});
