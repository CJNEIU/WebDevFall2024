import jwt from "jsonwebtoken";


const authenticate = (req,res,next) =>{
    
    try{
        const token = req.headers.authorization.split()[1];
        jwt.verify(token, JWT_KEY);
        next();
    }catch (error){
        res.status(401).json({
            sucess:false,
            data: "authentication failed"
        });
    }
}

export default authenticate;