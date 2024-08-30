import express from "express";
import errorHandler from "./middlewares/ErrorHandler.js";
import cookieParser from "cookie-parser"
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";


//create express app
const app = express();



//important middlewares
app.use(
  cors({
    origin: "*",
  })
);



//set up middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));




//check server
app.get("/", (req, res) => {
  res.render("index");
});

//health check
app.get("/health", (req, res) => {
  res.json({ message: "Server is healthy..😃" });
});

//define routes
app.use('/api/v1/user',userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/order' , orderRoute)
app.use('/api/v1/payment', paymentRoute)










//error handler
app.use(errorHandler);

export default app;