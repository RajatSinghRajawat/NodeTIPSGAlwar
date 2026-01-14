const express = require("express")
const { connection } = require("./src/config/db");
const  authRoutes  = require("./src/routes/routes");



const app = express()

app.use(express.json())


connection();

app.use("/auth" , authRoutes)






app.listen('3001', () => {
    console.log("connected successfully");

})