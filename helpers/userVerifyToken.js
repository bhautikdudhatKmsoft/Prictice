const User = require('../model/auth.model');
const jwt = require('jsonwebtoken');

exports.userVerifyToken = async(req,res,next) => {
    try {
        let authorization = req.headers['authorization'];

        if(authorization === undefined) {
            res.json({message : `Invalid Authorization ${console.error()}`});
        }

        let token = authorization.split(" ")[1];

        if(token === undefined) {
            res.json({message : `Unauthorize ${console.error()}`});
        }
        else {
            let decoded =  jwt.verify(token, 'User');
            let user = await User.findById(decoded.userId);

            if(user) {
                req.user = user;
                next();
            }
            else{
                return res.status(401).json({message : `Invalid user(token)........${console.error()}`});
            }
        }   
    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Internal server error.........${console.error()}`});
    }
}
