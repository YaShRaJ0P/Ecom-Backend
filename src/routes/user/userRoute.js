import { Router } from "express";

import isLoggedIn from "../../middlewares/Auth.js";
import { checkRateLimit, login, logout, register, verifyOtp } from "../../controllers/user/userController.js";
import { rateLimit } from "../../middlewares/rateLimit.js";

const userRoute = Router()



userRoute.post('/register',register)
userRoute.post('/verify-otp',verifyOtp)
userRoute.post('/login', login)
userRoute.post('/logout', isLoggedIn,logout)
userRoute.get('/limit',rateLimit,checkRateLimit)






export default userRoute;