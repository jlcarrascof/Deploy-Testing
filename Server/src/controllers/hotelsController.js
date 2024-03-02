const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const getHotelById = async (id) => {
  const db = getDb();
  try {
    const hotel = await db
      .collection("hotels")
      .findOne({ _id: new ObjectId(id) });
    return hotel;
  } catch (error) {
    throw error;
  }
};

const createHotel = async (hotelData) => {
  const db = getDb();

  try {
    const result = await db.collection("hotels").insertOne(hotelData);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateHotel = async (id, updateData) => {
  const db = getDb();

  try {
    const result = await db
      .collection("hotels")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    //return result.matchedCount > 0 ? true : false;
    return result.matchedCount > 0 && result.modifiedCount > 0;
  } catch (error) {
    throw error;
  }
};

const deleteHotelById = async (id) => {
  const db = getDb();

  try {
    const result = await db
      .collection("hotels")
      .deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0 ? "Hotel removed" : "Hotel not found";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotelById,
};
