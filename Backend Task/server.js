const express = require("express");
const cors =  require("cors");
require("dotenv").config();

const app=express();

app.use(express.json());
app.use(cors());


const authRoutes = require("./router/authRoutes");
app.use("/api/auth", authRoutes);

const taskRoutes = require("./router/taskRoutes");
app.use("/api/tasks", taskRoutes);



app.get("/", (req, res)=> {
    res.send("API Working...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log('Server running on port 5000');
});