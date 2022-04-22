import app from "./app.js"
import {connectDB} from "./database.js";
import {PORT} from "./config/dotenv.js"
connectDB()
app.listen(process.env.PORT || 5000, () => {
  console.log("server listening");
});
