
const mongoose = require("mongoose")

const db = () => {

mongoose.connect("mongodb://localhost:27017/student").then(()=>{
    console.log("connect");
    
}).catch(()=>{
    console.log("not");
    
})
}
module.exports = {db}