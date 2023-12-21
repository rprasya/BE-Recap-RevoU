const express = require("express");
const catalogRoutes = express.Router();
const { prisma } = require("../config/prisma")

// catalog routes

// GET all catalog
catalogRoutes.get("/", async (req, res) => {
    const catalog = await prisma.catalog.findMany();
    res.status(200).send(catalog);
  });
  
  // GET catalog by id
  catalogRoutes.get("/:id", async (req, res) => {
    const catalog = await prisma.catalog.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!catalog)
      res.status(404).json({
        message: "Catalog not found",
      });
    else res.status(200).json(catalog);
  });
  
  // POST create catalog
  catalogRoutes.post("/", async (req, res) => {
    const { name } = req.body;
    //   if (!name) res.status(400).json({ message: "Name is required" });
    const newCatalog = await prisma.catalog.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({
      message: "Catalog Created",
      data: newCatalog,
    });
  });
  
  // Update/PUT Catalog
  catalogRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCatalog = await prisma.catalog.update({
      where: { id: parseInt(id) },
      data: { name: name },
    });
    res.status(200).json({
      message: `catalog with id: ${id} is updated`,
      data: updatedCatalog,
    });
  });
  
  // Delete Catalog
  catalogRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.catalog.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: `product with id ${id} successfully deleted`,
    });
  });

  module.exports = {catalogRoutes}