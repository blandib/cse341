const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { getDB } = require('../data/database');

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const contacts = await contactsController.getAll(db);
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = getDB();
    const contact = await contactsController.getById(db, req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;