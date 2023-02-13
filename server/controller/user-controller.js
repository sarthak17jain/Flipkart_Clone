import User from '../model/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import {JWT_KEY} from '../secrets.js';
import dotenv from 'dotenv';
dotenv.config();
import cartModel from '../model/cartSchema.js';

//sameSite:'Lax' which is also the default option prevents CSRF attack
const cookieOptions = {
    httpOnly:true, 
    maxAge: 5*60*60*1000, //5 hours expiration
    sameSite:'Lax', 
    secure: process.env.NODE_ENV === 'production' ? true : false
}

export const userLogIn = async (req, res) => {
    console.log("server side userLogIn called");
    let data = req.body;
    try {
        let user = await User.findOne({ email: data.email });
        console.log(req.body.password+" "+req.body.email);
        // console.log(user);
        if(user) {
            bcrypt.compare(data.password, user.password, function(err, result) {
                if(result == true){
                    const uid = user['_id']//uid
                    // const token = jwt.sign({payload:uid}, JWT_KEY, {
                    const token = jwt.sign({payload:uid}, process.env.JWT_KEY, {
                        expiresIn: '5h' // expires in 5 hours
                    });
                    const accountDetails = {
                        email: user.email,
                        username: user.username,
                        phone: user.phone,
                        firstName: user.firstname,
                        lastname: user.lastname
                    }
                    const cookieData = {
                        jwt_token : token,
                        account : accountDetails
                    }
                    //sameSite:'Lax' which is also the default option prevents CSRF attack
                    // res.cookie('login', cookieData, {httpOnly:true, maxAge: 5*60*60*1000, sameSite:'Lax', secure: false});
                    res.cookie('login', cookieData, cookieOptions);
                    return res.status(200).json({
                        account: accountDetails,
                        message: `${req.body.email} login successful`,
                    });
                }else{
                    return res.status(401).json({
                        message: "wrong credentials",
                    });
                }
            });
            
        } else {
            return res.status(401).json({
                message: "User not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });     
    }
}

export const userSignUp = async (req, res) => {
    console.log("server side userSignup called");
    try {
        const dataObj = req.body;
        const exists = await User.findOne({ $or:[ { username: dataObj.username }, { email: dataObj.email } ]});
        if(exists) {
            return res.status(409).json({ message: 'User already exist'});
        }
        
        const user = await User.create(dataObj);
        await cartModel.create({email: dataObj.email, cartItems: []});
        if(user){
            const uid = user['_id']//uid
            // const token = jwt.sign({payload:uid}, JWT_KEY, {
            const token = jwt.sign({payload:uid}, process.env.JWT_KEY, {
                expiresIn: '5h' // expires in 5 hours
            });
            const accountDetails = {
                email: user.email,
                username: user.username,
                phone: user.phone,
                firstName: user.firstname,
                lastname: user.lastname
            }
            const cookieData = {
                jwt_token : token,
                account : accountDetails
            }
            //sameSite:'Lax' which is also the default option prevents CSRF attack
            // res.cookie('login', cookieData, {httpOnly:true, maxAge: 5*60*60*1000, sameSite:'Lax', secure: false});
            res.cookie('login', cookieData, cookieOptions);
            return res.status(200).send({
                account: accountDetails,
                message: `${user.firstname} has been successfully registered`,
            });
        }else{
            return res.status(500).json({
                message:"error while signing up",
                data:user
            });
        }
    } catch (error) {
        res.status(500).json('Error: '+error.message);
    }
}

//check if user is logged in 
export const verifyToken = async (req, res) => {
    console.log("server side verifyToken called");
    const loginCookie = req.cookies.login;
    console.log(loginCookie);
    if(loginCookie){
        // jwt.verify(loginCookie.jwt_token, JWT_KEY, (err, user) => {
        jwt.verify(loginCookie.jwt_token, process.env.JWT_KEY, (err, user) => {
            if(err){
                console.log(err)
                return res.status(403).json({
                    message: "jwt token auth failed"
                });
            }else{
                return res.status(200).send({
                    account: loginCookie.account,
                    message: "user successfully authenticated"
                });
            }
        })
    }else{
        return res.status(401).json({
            message: "no jwt cookie found"
        });
    }
}

export const logout = (req, res)=>{
    res.cookie('login',' ',{...cookieOptions, maxAge: 1});
    res.status(200).json({
        message:"user logged out succesfully"
    });
}