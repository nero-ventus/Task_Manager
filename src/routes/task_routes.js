const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async (req, res) => {
    const {title, description, subject, deadline, priority} = req.body;
    const task = new Task({title, description, subject, deadline, priority});
    //task.description = await task.encryptDescription(task.description);
    await task.save();
    
    res.json({Status : 'Saved'});
});

router.put('/:id', async (req, res) => {
    const {title, description, subject, deadline, priority} = req.body;
    const newTask = {title, description, subject, deadline, priority};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({Status : 'Updated'});
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({Status: 'Deleted'});
});

module.exports = router;