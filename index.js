const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.js");
const productsRoutes = require("./routes/products.js");
const reviewsRoutes = require("./routes/reviews.js");
const { init } = require("./config/dbconfig.js");
const errorHandler = require('./middleware/errorHandler.js');

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