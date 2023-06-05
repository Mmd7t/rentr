const express = require("express");
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
import reviewsRoutes from "./routes/reviews.js";
import { init } from "./config/dbconfig.js";
import errorHandler from './middleware/errorHandler.js';

/*---- CONFIGURATIONS ----*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);
app.use('/images', express.static('./images'))

app.get('/', (req, res) => {
    res.send('Hello World');
});

/*---- ROUTES ----*/
app.use("/api/auth", authRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/review", reviewsRoutes);

/*---- MYSQL SETUP ----*/
const PORT = process.env.APP_PORT || 3000;

init();

app.listen(PORT, () => console.log(`Server Running Successfully on Port ${PORT}`));