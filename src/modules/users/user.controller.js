import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../../../DB/models/user.model.js';

export let register = async (req, res, next) => {

    let { name, email, password } = req.body;
    let isEmailExist = await User.findOne({email})
    if(isEmailExist){
        return next(new Error("Email Already Exists", {cause: 409}))
    }
    let hashedPassword= bcryptjs.hashSync(password, +process.env.SALT_ROUNDS)
    let newUser = await User.create({ name, email, password: hashedPassword });
    if(!newUser){
        return next(new Error("Creation Failed", {cause: 500}))
    }
    return res.status(201).json({
        message: 'User created successfully', newUser 
    })
};

export let login = async (req, res, next) => {
    let { email, password} = req.body;
    let isEmailExists = await User.findOne({email});
    if (!isEmailExists) {
        return  next(new Error("invalid login credentials" , {cause:401}));
    }

    let isPasswordCorrect = bcryptjs.compareSync(password, isEmailExists.password);
    if(!isPasswordCorrect){
        return  next(new Error("invalid login credentials" , {cause:401}));
    } 
    let token = jwt.sign(
        {id:isEmailExists._id , userEmail:isEmailExists.email},
        process.env.LOGIN_SIGNATURE,
        {
            expiresIn: '48h'
        }
    )
    res.status(200).json({ message:'User logged in successfully ', token });
};

export let getUser = async (req, res, next) => {
        let user = req.authUser;
        res.status(200).json({ user });
};
