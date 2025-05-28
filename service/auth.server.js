const User = require('../model/auth.model');
const nodemailer = require('nodemailer')

module.exports = class userServices {

    // add user 

    async addUser(body) {
        try {
            return await User.create(body);
        } catch (error) {
            console.log(error);
            return error.message
        }
    };

    // get user

    async getUser(body) {
        try {
            return await User.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message
        }
    };

    // get user by id

    async getUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.log(error);
            return error.message
        }
    };

    // get all users 

    async getAllUsers(body) {
        try {
            return await User.find(body);
        } catch (error) {
            console.log(error);
            return error.message
        }
    };

    // update user

    async updateUser(id,body) {
        try {
            return await User.findByIdAndUpdate(id,{$set : body}, {new : true});
        } catch (error) {
            console.log(error);
            return error.message
        }
    };

    // generate otp 

    generateOtp() {
        const otp = Math.floor(100000 + Math.random() + 900000);
        return otp.toString();
    }

    createTransporter() {
        return nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.GMAIL_USER,
                pass : process.env.GMAIL_PASS
            }
        })
    }

    // send otp

    async sendOtp(user,otp) {
        try {
            const otp = this.generateOtp();
            user.otp = otp;
            user.otpExpires = Date.now() + 10 * 60 * 1000;
            await user.save();

            const mainOptios = {
                from : process.env.GMAIL_USER,
                to : user.email,
                subject : "Your otp code",
                text : `Your otp code is ${otp} , it will expire in the 10 minutes.`
            };

            const transporter  = this.createTransporter();;

            try {
                await transporter.sendMail(mainOptios);
                console.log('Otp send successfully,');
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // verfiy otp 

    async verifyOtp(user,otp) {
        try {
            if(user.otp !== otp)
            {
                return false
            }
            if(otpExpires < Date.now())
            {
                return false;
            }
            return true;
            
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}
