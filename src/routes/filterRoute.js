import { GetFilteredProducts } from "../controllers/user/filterController";

const router = express.Router();

router.get("/products/filter", (req, res) => GetFilteredProducts(req, res));
