const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth_demo"
});

db.connect((err) => {
    if (err){
        console.log("Database Connection failed: ", err);
    }else{
        console.log("Mysql Connected");
    }
})

module.exports = db;