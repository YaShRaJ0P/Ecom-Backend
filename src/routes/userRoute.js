import { Router } from "express";
import { login, logout, register, verifyOtp } from "../controllers/userController.js";
import isLoggedIn from "../middlewares/Auth.js";

const userRoute = Router()



userRoute.post('/register',register)
userRoute.post('/verify-otp',verifyOtp)
userRoute.post('/login', isLoggedIn,login)
userRoute.post('/logout', logout)






export default userRoute;