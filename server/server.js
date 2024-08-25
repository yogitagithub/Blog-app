const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();


const userRoutes = require("./routes/userRoutes");
 const blogRoutes = require("./routes/blogRoutes");


connectDB();


const app = express();


app.use(cors());
app.use(express.json());



app.use("/api/v1/user", userRoutes);
 app.use("/api/v1/blog", blogRoutes);


const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(
    `Server Running on port no ${PORT}`
  );
});