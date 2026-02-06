export const validateRequiredFields =(data,requiredFields)=>{
const missingFields =requiredFields.filter((field)=>!data[field]);


return{
    isValid:missingFields.length ===0,
    missingFields,
}
}