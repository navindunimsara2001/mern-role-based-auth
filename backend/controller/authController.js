import express from "express"
import User from "../models/User.js";
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"

/**
 * generate jwt
 * @param {number} id 
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

/**
 * hash password
 * @param {string} password 
 */
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

/**
 * compare hashedPassword with password
 * @param {*} password 
 * @param {*} hashedPassword  
 */
const validatePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error validating password');
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const registerUser = async(req,res)=>{
    var {name, email, password, role} = req.body;

    const isExist = await User.findOne({email:email});

    if(isExist){
        return res.status(400).json({ message: 'User already exists' });
    }
    // hash
    password =  await hashPassword(password);

    const user = await User.create({
        name,
        email,
        password,
        role,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
export const authUser = async (req,res)=>{
    const {email,  password} = req.body;
    const user = User.findOne({email: email});

    if(user && validatePassword(password,user.password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
}

export const getUserProfile = async (req,res)=>{
    const user = await User.findById(req.user.id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}