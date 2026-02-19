import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import recipeRoutes from "./routes/recipe.route.js"
import db from "./config/db.js"
dotenv.config()
console.log(db.state)
const app = express()
const port =process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/api/health",(req,res)=>{
res.json({message:"your service is running live"})
})


//Routes
app.use("/api/auth",authRoutes)
app.use("/api/recipe",recipeRoutes)





app.listen(port,()=>{
console.log(`server is running on the port : ${port}`)
})