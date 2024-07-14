import mongoose, { Schema } from 'mongoose';

let categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true,},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

let Category = mongoose.model('Category', categorySchema);

export default Category;