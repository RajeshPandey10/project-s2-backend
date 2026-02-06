import { sendError } from "../utils/responseHandler.js";
import { validateRequiredFields } from "../utils/validation.js";
import User from "../models/user.model.js";


export const register = async(req,res)=>{
   const {username,email,password} =req.body;
  try {
    const {isValid} = validateRequiredFields(req.body,[
        "username",
        "email",
        "password"
    ]);
    if(!isValid){
       return sendError(res,400,"Please fill all fields")
       
    }

    const userExists = await User.findOne({email})

    if(userExists){
        return sendError(res,400,"user already exists")
    }


  const newUser = new User({
    username,email,password
  })
  const user = await newUser.save()
  res.status(201).json({
    sucess:true,
    data:user
  })

   
    
    
  } catch (error) {
    console.log("Registration error:",error)
    sendError(res,500,"server error")
  }

}