require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { catalogRoutes } = require("./routes/catalogRoutes");
const { productRoutes } = require("./routes/productRoutes");
const { messageRoutes } = require("./routes/messageRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET
app.get("/", async (req, res) => {
  res.send("here is the response");
});

// Catalog Routes
app.use("/catalogs", catalogRoutes)

// Products Routes
app.use("/products", productRoutes)

// Message Routes
app.use("/messages", messageRoutes)

// Wrong Url API
app.all("*", async (req, res) => {
  res.json({
    message: "Routes you're looking is not found",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is already running at ${PORT}`);
});
