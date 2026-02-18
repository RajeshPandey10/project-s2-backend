import { sendError } from "../utils/responseHandler.js";
import cloudinary from "./cloudinary.js";


function uploadToCloudinary(fileBuffer){
    return new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream(
        {folder:"project_s2"},
        (error,result)=>{
            if(error) return reject(error);
            resolve(result.secure_url);
        }
    )
    stream.end(fileBuffer)
    })
}

//middleware to upload images
export const cloudinaryUpload = async(req,res,next)=>{
    try {

        if(!req.files || req.files.length ===0){
            req.cloudinaryImages = [];
            return next()
        }
        const urls = await Promise.all(req.files.map((file)=>uploadToCloudinary(file.buffer)))
        console.log("urls",urls)
        req.cloudinaryImages=urls;
        console.log(req.cloudinaryImages)
        next();
    } catch (error) {
        return sendError(res,500,"image upload failed"+error)
    }
}