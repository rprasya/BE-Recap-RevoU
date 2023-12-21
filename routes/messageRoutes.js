const express = require("express");
const { prisma } = require("../config/prisma");
const messageRoutes = express.Router();

// GET
messageRoutes.get("/", async (req, res) => {
  const messages = await prisma.contactus.findMany();
  res.status(200).send(messages);
});

// POST
messageRoutes.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = await prisma.contactus.create({
    data: {
      name: name,
      email: email,
      message: message,
    },
  });
  res.status(201).json({
    message : "Message Created",
    data: newMessage
  })
});

module.exports = { messageRoutes };
