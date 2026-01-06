const { course } = require("../models/courses");





const courseAdd = async (req, res) => {

    const { courseName } = req.body;

    const add = await course.create({
        courseName
    });

    if (add) {
        res.status(200).json({ message: "Courses successfully", add })

    } else {
        res.status(409).json({ message: "Courses successfully", add })
    }



}

module.exports = {
    courseAdd
}