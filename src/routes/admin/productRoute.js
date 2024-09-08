import { Router } from "express";

import { addProduct } from "../../controllers/admin/productController.js";

const productRoute = Router()



productRoute.post('/addProduct',addProduct)






export default productRoute;