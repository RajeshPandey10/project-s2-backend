import Recipe from "../models/recipe.model.js";
import { sendError } from "../utils/responseHandler.js";
import { validateRequiredFields } from "../utils/validation.js";



export const createRecipe = async(req,res)=>{
const {title,ingredients,instructions,category,cookingTime} = req.body;

try {
    console.log("user:",req.user?._id)
    console.log("files received:", req.files?.length || 0);
    console.log(req.files[0].buffer)
    console.log("Cloudinary Images:",req.clodinaryImages?.length || 0)
    console.log(req.clodinaryImages)
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
        if(!req.cloudinaryImages || req.cloudinaryImages.length ===0){
            console.log("no images uploaded");
            return sendError(res,400,"please upload at least one image")
        }

        //create
        const recipeData = {
            title,
            ingredients,
            instructions,
            category,
            cookingTime,
            photoUrls:req.clodinaryImages,
            createdBy:req.user._id
        };
        console.log("creating recipe :",recipeData);
        const newRecipe = new Recipe(recipeData);
        const savedRecipe = await newRecipe.save();
        console.log("recipe created sucessfully",savedRecipe._id);
        res.status(201).json(savedRecipe)
} catch (error) {
    console.error("create recipe error:",error)
    sendError(res,500,"server error "+ error)

}

}
export const getRecipe =async(req,res)=>{


}
