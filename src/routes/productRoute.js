import { Router } from "express";
import { addProduct } from "../controllers/productController.js";


const productRoute = Router()



productRoute.post('/addProduct',addProduct)






export default productRoute;