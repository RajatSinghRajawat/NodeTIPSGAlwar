const { course } = require("../models/courses");

const add = async (req, res) => {
    try {
        const { name, descr } = req.body
        const course1 = await course.create({
            name, descr
        })
        res.status(201).json(course1)
    } catch (error) {
        console.log(error);
        
        
    }
}
const get = async (req, res) => {
    try {
        const courses = await course.find() 
        res.status(200).json(courses)
    } catch (error) {
        console.log(error);
    }
}
module.exports = { add, get }
