
const { ObjectId } = require('mongodb');

// GET all contacts
exports.getAll = async (db) => {
  return await db.collection('contacts').find().toArray();
};

// GET single contact
exports.getById = async (db, id) => {
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('contacts').findOne({ _id: new ObjectId(id) });
};

// POST create contact
exports.createContact = async (db, contactData) => {
  const result = await db.collection('contacts').insertOne(contactData);
  return { ...contactData, _id: result.insertedId };
};

// PUT update contact
exports.updateContact = async (db, id, updateData) => {
  if (!ObjectId.isValid(id)) return null;
  
  await db.collection('contacts').updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  
  return await this.getById(db, id); // Return updated document
};

// DELETE contact (ADD THIS)
exports.deleteContact = async (db, id) => {
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
};