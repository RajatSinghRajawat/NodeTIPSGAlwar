const mongoose = require('mongoose');
const express = require('express');
const { connection } = require('./src/config/db');
const courseRouter = require('./src/routes/coursesroute');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connection();

// Mount course routes under /courses
app.use('/courses', courseRouter);


// mongoose.connect('mongodb://localhost:27017/mydatabase', )
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));
// const itemSchema = new mongoose.Schema({
//     name: String,
//     value: Number
// });
// const Item = mongoose.model('Item', itemSchema);





// app.post("/add", async(req , res)=>{
//     const { name, value } = req.body;
//     const add = await Item.create({ name, value });
//    if(add){
//         res.status(200).json({message: "Item added successfully",  add})

//    }else{
//         res.status(400).json({message: "Item not added ",  add})
//    }
// })







// app.get('/get' , async (req, res) => {
//     const items =  await Item.find({});
//     if(items){
//         res.status(200).json(items);
//     } else {
//         res.status(404).json({ message: 'No items found' });
//     }
// });


// app.get('/items/:id', async (req, res) => {

//     const item = await Item.findById(req.params.id);
//     if (item) {
//         res.status(200).json(item);
//     } else {
//         res.status(404).json({ message: 'Item not found' });
//     }

// });



// app.delete('/delete/:id', async (req, res) => {
//     const result = await Item.findByIdAndDelete(req.params.id);
//     if (result) {
//         res.status(200).json({ message: 'Item deleted successfully' });
//     } else {
//         res.status(404).json({ message: 'Item not found' });
//     }
// });

// app.put('/update/:id', async (req, res) => {

//     const item = await Item.findByIdAndUpdate(req.params.id,  req.body );
//     if (item) {
//         res.status(200).json({ message: 'Item updated successfully', item });
//     } else {
//         res.status(404).json({ message: 'Item not found' });
//     }
// });







// // Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});