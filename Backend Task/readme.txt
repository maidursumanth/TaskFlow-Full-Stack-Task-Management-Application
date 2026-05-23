backend/
│── config/
│   └── db.js
│── models/
│   └── userModel.js
│── controllers/
│   └── authController.js
│── routes/
│   └── authRoutes.js
│── server.js


npm init -y
npm install express mysql2 cors bcryptjs jsonwebtoken dotenv

//Initil command to install node_modules
npm i

//To Run Server use
node server.js







const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);
