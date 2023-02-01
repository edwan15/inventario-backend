const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/UserRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");
const productRoute = require("./routes/RoutesProduct")
const contactRoute = require("./routes/contactRoutes");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3001"],
    
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(errorHandler)
const PORT = process.env.PORT || 4500;


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
