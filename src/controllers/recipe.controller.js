import { sendError } from "../utils/responseHandler.js";
import { validateRequiredFields } from "../utils/validation.js";



export const createRecipe = async(req,res)=>{
const {title,ingredients,instructions,category,cookingTime} = req.body;

try {
    console.log("user:",req.user?._id)
     const {isValid} = validateRequiredFields(req.body,[
           "title",
           "ingredients",
           "instructions",
           "category",
           "cookingTime" 
        ]);
        if(!isValid){
            console.log("validation failed : missing required fields")
            return sendError(res,400,"please fill all the fields")
        }

} catch (error) {
    console.error("create recipe error:",error.message)
    sendError(res,500,"server error "+ error.message)

}

}