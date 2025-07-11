const { ObjectId } = require('mongodb');

exports.getAll = async (db) => {
  return await db.collection('contacts').find().toArray();
};

exports.getById = async (db, id) => {
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('contacts').findOne({ _id: new ObjectId(id) });
};