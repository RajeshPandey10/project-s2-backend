


export const protect = async(req,res,next)=>{
    let token;
   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
        token = req.headers.authorization.split(" ")[1]
        console.log(token)
        return next()
    } catch (error) {
        console.log(error)
    }
   }

}