const { ObjectId } = require('mongodb');

exports.getAllContacts = async (db) => {
  return await db.collection('contacts').find().toArray();
};

exports.getContactById = async (db, id) => {
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('contacts').findOne({ _id: new ObjectId(id) });
};
