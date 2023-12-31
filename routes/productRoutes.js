const express = require("express");
const { prisma } = require("../config/prisma");
const productRoutes = express.Router();

// GET Products
productRoutes.get("/", async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      catalog: true,
    },
  });
  res.status(200).send(products);
});

// POST
productRoutes.post("/", async (req, res) => {
  // const {name, price, imageUrl, catalogId} req.body
  const newProduct = await prisma.product.create({
    data: {
      name: req.body.name,
      price: parseInt(req.body.price),
      imageUrl: req.body.imageUrl,
      catalogId: parseInt(req.body.catalogId),
    },
  });
  res.status(201).json({
    message: "Product created",
    data: newProduct,
  });
});

// GET Product by CatalogId
productRoutes.get("/:catalogId", async (req, res) => {
  const { catalogId } = req.params;
  const products = await prisma.product.findMany({
    where: {
      catalog: {
        id: parseInt(catalogId),
      },
    },
  });
  res.status(200).send(products);
});

module.exports = { productRoutes };
