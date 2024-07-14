
import mongoose, { Schema } from "mongoose";

let taskSchema = new mongoose.Schema({
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    type: { type: String, enum: ['Text', 'List'], required: true },
    body: { type: Schema.Types.Mixed, required: true }, 
    shared: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

let Task = mongoose.model('Task', taskSchema);

export default Task;
