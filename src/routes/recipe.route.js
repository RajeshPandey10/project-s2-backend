import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createRecipe } from "../controllers/recipe.controller.js";
import upload from "../config/multer.js";
import { cloudinaryUpload } from "../config/cloudinaryUpload.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.array("images", 5),
  cloudinaryUpload,
  createRecipe,
);

export default router;
