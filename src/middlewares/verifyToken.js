import jwt from 'jsonwebtoken'


export const verifyToken = (req,res,next)=>{
    
    try{
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json({
                auth:false,
                message:'no token provided'
            })
        }
        const decoded = jwt.verify(token,'secret')
        req.userId = decoded
        next()
    }catch(error){
        console.log(error)
    }
    
}