import Category from "../../../DB/models/category.model.js";

export let createCategory = async (req, res, next) => {
    let { categoryName } = req.body;
    let {_id} = req.authUser;
    let checkCategory = await Category.findOne({categoryName, userId: _id })
    if(checkCategory){
        return next(new Error("You Added This Category before", {cause: 409}))
    }

    let createCategory = await Category.create({ categoryName, userId:_id })
    if(!createCategory){
        return next(new Error("Creation Failed", {cause: 409}))
    }
    return res.status(201).json({
        message: 'Category Added successfully', createCategory 
    })
};


export let getCategories = async (req, res, next) => {
    let {_id} = req.authUser;
    let getAllCategories = await Category.find({userId:_id})    
    if(!getAllCategories){
        return next(new Error("No Categories Found For This User", {cause: 409}))
    }
    return res.status(201).json({
        message: 'Success', getAllCategories 
    })
};

export let updateCategory = async (req, res, next) => {
    let { categoryId } = req.params;
    let { categoryName } = req.body;
    let category = await Category.findById(categoryId);
    if (!category) {
        return next(new Error("Category not found", { cause: 404 }));
    }
    if (category.userId.toString() !== req.authUser._id.toString()) {
        return next(new Error("Unauthorized to update this category", { cause: 403 }));
    }
    category.categoryName = categoryName;
    await category.save();
    res.status(200).json({ message: 'Category updated successfully', category });
};

export let deleteCategory = async (req, res, next) => {
    let { categoryId } = req.params;
    let userId = req.authUser._id;
    let category = await Category.findOneAndDelete({ _id: categoryId, userId });
    if (!category) {
        return next(new Error("Category not found or unauthorized", { cause: 404 }));
    }
    res.status(200).json({ message: 'Category deleted successfully' });
};
