const express = require('express');
const userRoute = express.Router();
const { userVerifyToken } = require('../helpers/userVerifyToken');
const {
    registerUser,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    registerByOtp,
    loginByOtp
} = require('../controller/auth.controller');

userRoute.post('/registeUser',registerUser);
userRoute.post('/loginUser',loginUser);
userRoute.post('/registerByOtp',registerByOtp);
userRoute.post('/loginByOtp',loginByOtp);
userRoute.get('/getAllUsers',userVerifyToken, getAllUsers);
userRoute.get('/getUser',userVerifyToken, getUser);
userRoute.put('/updateUser', userVerifyToken, updateUser);
userRoute.delete('/deleteUSer',userVerifyToken,deleteUser);
    
module.exports =  userRoute;