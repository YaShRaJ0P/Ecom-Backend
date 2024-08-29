import { GetFilteredProducts } from "../controllers/user/filter";

const router = express.Router();

router.get("/products/filter", (req, res) => GetFilteredProducts(req, res));
