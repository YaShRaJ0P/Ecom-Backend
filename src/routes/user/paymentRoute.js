
import { Router } from "express";
import { paymentMethod } from "../../controllers/user/paymentController.js";



const paymentRoute = Router()



paymentRoute.post('/testPayment',paymentMethod)






export default paymentRoute;