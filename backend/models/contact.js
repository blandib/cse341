

const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const Contact = require('../models/contact');
const { getDB } = require('../data/database');
const { validateContact, validateUpdate } = require('../middleware/validation');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create new contact
router.post('/', validateContact, async (req, res) => {
  try {
    const newContact = await Contact.createContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    // Validate ID format
    if (!mongodb.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const contact = await Contact.getContactById(id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update contact
router.put('/:id', validateUpdate, async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedContact = await Contact.updateContact(id, updateData);
    res.status(200).json(updatedContact);
  } catch (err) {
    // Handle specific error cases
    if (err.message === 'Invalid ID format') {
      return res.status(400).json({ error: err.message });
    }
    if (err.message === 'Contact not found') {
      return res.status(404).json({ error: err.message });
    }
    console.error('PUT Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE contact
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Contact.deleteContact(id);
    res.status(200).json({ 
      message: 'Contact deleted successfully',
      deletedCount: result.deletedCount 
    });
  } catch (err) {
    // Handle specific error cases
    if (err.message === 'Invalid ID format') {
      return res.status(400).json({ error: err.message });
    }
    if (err.message === 'Contact not found') {
      return res.status(404).json({ error: err.message });
    }
    console.error('DELETE Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




 
module.exports = router;
     
    

