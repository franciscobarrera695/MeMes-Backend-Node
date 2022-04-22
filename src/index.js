import app from "./app"
import "./database.js";
connectDB()
app.listen(process.env.PORT || 5000, () => {
  console.log("server listening");
});
