import Tasks from '../models/task.model.js';

export const getTasks = async(req, res) => {
    try {
        const tasks = await Tasks.find({user: req.user.id}).populate('user');
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}
export const getTask = async(req, res) => {
    try {
        const taskFound = await Tasks.findById(req.params.id).populate('user');
        if(!taskFound)return res.status(400).json({message: 'Task not found'});
        return res.status(200).json(taskFound);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}
export const createTasks = async(req, res) => {
    const {title, description, date} = req.body;
    try {
        const task = new Tasks({title, description, date, user: req.user.id});
        const newTask = await task.save();
        return res.status(201).json({newTask});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}
export const updateTasks = async(req, res) => {
   try {
        const taskFound = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!taskFound) return res.status(400).json({message: 'Task not found'});
        return res.status(200).json(taskFound);
   } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
   }
}
export const deleteTasks = async(req, res) => {
    try {
        const taskFound = await Tasks.findByIdAndDelete(req.params.id);
        if(!taskFound) return res.status(400).json({message: 'Task not found'});
        return res.status(200).json({message: 'Task deleted successfolly'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}