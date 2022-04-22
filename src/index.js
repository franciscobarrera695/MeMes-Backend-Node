import app from "./app"
import "./database.js";
import {PORT} from "./config/dotenv"
connectDB()
app.listen(process.env.PORT || 5000, () => {
  console.log("server listening");
});
