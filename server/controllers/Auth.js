const Users = require('../models/Users');
const OTP = require('../models/OTP')
const otpGenerator =  require('otp-generator');
const bcrypt = require('bcrypt');
const Profiles = require('../models/Profiles');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate")

exports.sendOTP = async (req,res) => {
    try{
        const {email} = req.body;

        if(!email){
        return res.status(500).json({
            success: false,
            message : 'Invalid email format',
        });
        }

        const user = await Users.findOne({email});
        if(user){
            return res.status(401).json({
                success : false,
                message : "User is already registered with us"
            });
        }

        let generatedOTP = otpGenerator.generate(6,{
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false,
            specialChars : false,
        });

        let result = await OTP.findOne({otp : generatedOTP});

        while(result){
            generatedOTP = otpGenerator.generate(6,{
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false,
            specialChars : false,
            });
            result = OTP.findOne({otp : generatedOTP});
        }

        const response = await OTP.create({
            email,
            otp : generatedOTP,
        });
        // console.log("SCHEMA...",response);
        return res.status(200).json({
            success : true,
            data : response,
            message : "OTP sent successfully to the email"
        });

    }catch(error){
        // console.log(error);
        return res.status(500).json({
            success : false,
            error : "Error in sending otp",
            message : error.message,
        })
    }
}


exports.signup = async (req,res) => {
    try{
    const {firstname,lastname,email,password,confirmPassword,otp,accountType} = req.body;

    if(!firstname || !lastname || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success : false,
            error : "kuch gadbad hai",
            message : "Fill all the details carefully"
        });
    }

    const user = await Users.findOne({email});
    if(user){
        return res.status(500).json({
            success : false,
            message : "User already exist with the email id"
        });
    }

    if(password !== confirmPassword){
        return res.status(500).json({
            success : false,
            message : "Password does not match"
        });       
    }

    const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
    // console.log(recentOtp);
    if(recentOtp.length == 0){
        // OTP not found for the email
        return res.status(400).json({
            success : false,
            recentOtp,
            message : "Invalid otp",
        });
    }

    if(recentOtp[0].otp !== otp){
        return res.status(500).json({
            success : false,
            message : "OTP is incorrect"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    let approved = ""
    approved === "instructor" ? (approved = false) : (approved = true)


    const profileDetails = await Profiles.create({
        gender : null,
        dob : null,
        about : null,
        contactNumber: null,
    });

    const newUser = await Users.create({
        firstname,
        lastname,
        email,
        password : hashedPassword,
        accountType,
        approved : approved,
        profile : profileDetails._id,
        image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`
    });

    return res.status(200).json({
        success : true,
        data : newUser,
        message : "Account created Successfully"
    });
     

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.login = async (req,res) => {
    try{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success : false,
            message : "Please fill up all the details"
        })
    }

    const user = await Users.findOne({email}).populate("profile");

    if(!user){
        return res.status(500).json({
            success : false,
            message : "User is not Registered with Us Please SignUp to Continue"
        })
    }

    const valid = await bcrypt.compare(password,user.password);
    if(!valid){
        return res.status(500).json({
            success : false,
            message : "Incorrect login credentials"
        })
    }
    
    const payload = {
        email : user.email,
        role : user.accountType,
        id : user._id,
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn : "3h",
    });
    user.token = token;

    const options = {
        httpOnly: true,
        expires : new Date(Date.now() + 3*24*60*60*1000),
    }
    res.cookie("token",token,options).status(200).json({
        success : true,
        token: token,
        user : user,
        message : "Log In successful"
    })


    }catch(error){
        return res.status(500).json({
            success : false,
            data:"kuch gadbad hai",
            message : error.message
        })
    }
}

exports.changePassword = async (req,res) => {
    try{

    const user = await Users.findById(req.user.id);
    const {password,newPassword,confirmNewPassword} = req.body;

    if(!password || !newPassword || !confirmNewPassword){
        return res.status(500).json({
            success : false,
            message : "Fill all the details carefully",
        });
    }

    if(!user){
         return res.status(500).json({
            success : false,
            message : "User does not exist",
        });
    }

    const valid = await bcrypt.compare(password,user.password);
    if(!valid){
        return res.status(401).json({
            success : false,
            message : "Incorrect login credentials"
        })
    }

    if(newPassword !== confirmNewPassword){
        return res.status(500).json({
            success : false,
            message : "Password and confirm password does not match"
        });  
    }

    const hashedPassword = bcrypt.hash(newPassword,10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: hashedPassword },
      { new: true }
    );

    const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstname} ${updatedUserDetails.lastname}`
        ));
    
        // console.log(emailResponse);

    return res.status(200).json({
        success : true,
        data : user,
        message : "Password changed successfully"
    });

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}