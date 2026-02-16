import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createRecipe } from "../controllers/recipe.controller.js";


const router=express.Router()


router.post("/",protect,createRecipe)




export default router