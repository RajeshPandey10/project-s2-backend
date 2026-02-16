import cloudinary from "./cloudinary.js";


function uploadToCloudinary(fileBuffer){
    const stream = cloudinary.uploader.upload_stream(
        {folder:"project_s2"},
        (error,result)=>{
            if(error) return reject(error);
            resolve(result.secure_url);
        }
    )
    stream.end(fileBuffer)
}

//middleware to upload images