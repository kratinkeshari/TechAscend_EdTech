const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

exports.auth = async (req,res,next) => {
    try{
    let token = null;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.body?.token) {
      token = req.body.token;
    } else if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    }
        if (!token) {
			return res.status(401).json({ 
                success: false,
                 message: `Token Missing`
            });
		}
        try{
            const decoded = await jwt.verify(token,process.env.JWT_SECRET);
            req.payload = decoded;
            next();

        }catch(error){
            return res.status(500).json({
                success : false,
                message : "Token cannot be verified"
            })
        }

    }catch(error){
        return res.status(500).json({
            success : false,
            data : "here",
            message : error.message,
        })
    }
};

exports.isStudent = async (req,res,next) => {
    try{
        const payload = req.payload;

        if(payload.role !== "student"){
            return res.status(500).json({
                success : false,
                message : "This is a Protected Route for Students",
            })
        }

        next();

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

exports.isInstructor = async (req,res,next) => {
    try{
        const payload = req.payload;

        if(payload.role !== "instructor"){
            return res.status(500).json({
                success : false,
                message : "This is a Protected Route for Instructor",
            })
        }

        next();

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

exports.isAdmin = async (req,res,next) => {
    try{
        const payload = req.payload;

        if(payload.role !== "admin"){
            return res.status(500).json({
                success : false,
                message : "This is a Protected Route for Admin",
            })
        }

        next();

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

