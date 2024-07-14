import Task from "../../../DB/models/task.model.js";
import Category from "../../../DB/models/category.model.js";
import { ApiFeatures } from "../../utils/api-features.js";

// Create Task
export let createTask = async (req, res, next) => {
        let { categoryId, type, body, shared } = req.body;
        let userId = req.authUser._id;
        // Check if the category exists and belongs to the user
        let category = await Category.findOne({ _id: categoryId, userId });
        if (!category) {
            return next(new Error("Category not found or access denied", { cause: 404 }));
        }
        // Validate task body based on type
        if (type === 'Text' && typeof body !== 'string') {
            return next(new Error("Invalid body for Text task", { cause: 400 }));
        }
        if (type === 'List' && !Array.isArray(body)) {
            return next(new Error("Invalid body for List task", { cause: 400 }));
        }
        let newTask = await Task.create({ categoryId, type, body, shared, userId });
        res.status(201).json({ message: 'Task created successfully', task: newTask });
}

// Get Tasks
export let getTasks = async (req, res, next) => {
        let userId = req.authUser ? req.authUser._id : null;
        let {page, size,sort,...search } = req.query
        let features = new ApiFeatures(req.query, Task.find({
            $or: [
                { shared: true },
                { userId }
            ]
        }))
        .pagination({page,size})
        .sort(sort)
        .search(search)
    let products = await features.mongooseQuery
    res.status(200).json({ success: true, data: products })
}

// Update Task
export let updateTask = async (req, res, next) => {

        let { id } = req.params;
        let { categoryId, type, body, shared } = req.body;
        let userId = req.authUser._id;

        // Check if the task exists and belongs to the user
        let task = await Task.findOne({ _id: id, userId });
        if (!task) {
            return next(new Error("Task not found or access denied", { cause: 404 }));
        }

        // Check if the new category exists and belongs to the user
        if (categoryId) {
            let category = await Category.findOne({ _id: categoryId, userId });
            if (!category) {
                return next(new Error("Category not found or access denied", { cause: 404 }));
            }
        }

        // Validate task body based on type
        if (type === 'Text' && typeof body !== 'string') {
            return next(new Error("Invalid body for Text task", { cause: 400 }));
        }
        if (type === 'List' && !Array.isArray(body)) {
            return next(new Error("Invalid body for List task", { cause: 400 }));
        }

        let updatedTask = await Task.findByIdAndUpdate(id, { categoryId, type, body, shared }, { new: true });
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
}
// Delete Task
export let deleteTask = async (req, res, next) => {
        let { id } = req.params;
        let userId = req.authUser._id;
        // Check if the task exists and belongs to the user
        let task = await Task.findOne({ _id: id, userId });
        if (!task) {
            return next(new Error("Task not found or access denied", { cause: 404 }));
        }
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
}
