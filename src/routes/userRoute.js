import { Router } from "express";
import { register } from "../controllers/userController.js";

const userRoute = Router()



userRoute.post('/register',register)






export default userRoute;