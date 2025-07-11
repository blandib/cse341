const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { getDb } = require('../data/database');

router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await contactsController.getAllContacts(db);
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const contact = await contactsController.getContactById(db, req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
