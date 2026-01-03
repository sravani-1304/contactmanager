const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const contact = await Contact.create({ name, email, phone, message });
  res.status(201).json(contact);
});

// READ
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const contact = await Contact.findByIdAndUpdate(req.params.id, { name, email, phone, message }, { new: true });
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(contact);
});

// DELETE (BONUS)
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
