
import { Router } from "express";
import { createOrder } from "../../controllers/admin/orderController.js";


const orderRoute = Router()



orderRoute.post('/createOrder',createOrder)






export default orderRoute;