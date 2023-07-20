const router = require('express').Router();

//import todo model
const todoItemsModel = require('../models/todoitems')

//must use async-await when dealing with promises and database

//first Route -- we'll be adding Todo Item to our database
router.post('/api/item', async(req,res)=>{
    try {
        const newItem = new todoItemsModel({
            item : req.body.item
        })

        //saving the item in database
        const saveItem = await newItem.save()
        res.status(200).json(saveItem);

    } catch (err) {
        res.json(err);
    }
})

//second Route -- get data from database
router.get('/api/items', async(req,res)=>{
    try {
        const allTodoItems = await todoItemsModel.find({})
        res.status(200).json(allTodoItems)
    } catch (err) {
        res.json(err);
    }
})

//third Route -- update item
router.put('/api/item/:id',async(req,res)=>{
    try {
        //find the items by its id and update it
        // const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
            item: req.body.item
          });
        res.status(200).json("updated Succesfully");

    } catch (err) {
        res.json(err);
    }
})





//fourth Route - delete Item
router.delete('/api/item/:id',async (req,res)=>{
    try {
        //find the item by id and delete it
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted');
    } catch (err) {
        res.json(err);
    }
})

//export router
module.exports = router;