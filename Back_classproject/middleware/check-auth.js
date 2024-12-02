import jwt from "jsonwebtoken";


const authenticate = (req,res,next) =>{
    
    try{
        const token = req.headers.authorization.split()[1];
        jwt.verify(token, "secret this should be longer");
        next();
    }catch (error){
        res.status(401).json({
            sucess:false,
            data: "authentication failed"
        });
    }
}

export default authenticate;