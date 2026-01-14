const mongoose = require('mongoose');



const connection = ()=>{
    mongoose.connect("mongodb://localhost:27017/Practic").then(()=>{
        console.log("mongoose conenct ");
        
    }).catch(()=>{
        console.log("mongoose not conenct ");

    })
}

module.exports = {connection}