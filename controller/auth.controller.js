const UserServices = require('../service/auth.server');
const userServices = new UserServices();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async(req,res) => {
    try {
        let user = await userServices.getUser({email : req.body.email});

        if(user) {
            return res.status(400).json({message : `user alredy registered..............`});
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10);

        user = await userServices.addUser({...req.body, password : hashPassword});

        res.status(201).json({message : `User register successfully..........`,user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanl server error........${console.error()}`});
    }
};

exports.loginUser = async(req,res) => {
    try {
        let user = await userServices.getUser({email : req.body.email});

        if(!user) {
            return res.status(404).json({message : `User does not found.........`});
        }

        let password = await bcrypt.compare(req.body.password, user.password);

        if(!password) {
            return res.status(401).json({message : `Password is not match...........`});
        }

        let token= jwt.sign({userId : user._id}, 'User');
        console.log(token);

        res.status(200).json({message : `User login successfully..........`,user,token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error.......${console.error()}`});
    }
};

exports.registerByOtp = async(req,res) => {
    try {
        let user = await userServices.getUser({email : req.body.email});

        if(user) {
            return res.status(400).json({message : `User already registered.............`});
        }

        user = await userServices.addUser({...req.body});

        await userServices.sendOtp(user);

        res.status(201).json({message : 'Otp send successfully..........'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message : `Interanal server error......${console.error()}`});
    }
}

exports.loginByOtp = async(req,res) => {
    try {
        let user = await userServices.getUser({email : req.body.email, isDelete : false});

        if(!user) {
            return res.status(404).json({message : `User is not registered.............`});
        }

        const otpValidate = await userServices.verifyOtp(user,req.body.otp);

        if(!otpValidate) {
            return res.status(401).json({message : `Invalid or expired OTP.....`})
        }
        
        let token = await jwt.sign({userId : user._id},'User');
        console.log(token);

        res.status(200).json({user,token,message : `User login successfully............`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error...........${console.error()}`});
    }
};

exports.getAllUsers = async(req,res) => {
    try {
        let users = await userServices.getAllUsers({isDelete : false});

        if(!users) {
            return res.status(404).json({messag : `Users is not found.............`});
        }

        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Internal server error.......${console.log(error)}`});
    }
};

exports.getUser = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.query.userId);

        if(!user) {
            return res.status(404).json({message : `User is not found........`});
        }

        res.status(200).json({message : `User get successfully..........`,user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Inteanal server error..........${console.error()}`});
    }
};

exports.updateUser = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.query.userId);

        if(!user) {
            return res.status(404).json({message : `User is not found........`});
        }

        user = await userServices.updateUser(user._id,{...req.body});

        res.status(201).json({message : `User update successfully......`,user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Internal server error...........${console.error()}`});
    }
};

exports.deleteUser = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.query.userId);

        if(!user) {
            return res.status(404).json({message : `User already not found.......`});
        }

        user = await userServices.updateUser(user._id, {isDelete : true});

        res.status(200).json({message : `User delete successfully.......`,user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error.....${console.error()}`});
    }
}