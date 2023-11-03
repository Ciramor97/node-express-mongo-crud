const { User } = require("../model/utilisateur");
const client = require("../bd/connect");
const { ObjectID } = require("bson");

const addUser = async (req, res) => {
  try {
    let utilisateur = new User(
      req.body.noms,
      req.body.adresse,
      req.body.telephone
    );

    let result = await client.bd().collection("users").insertOne(utilisateur);

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    let cursor = client.bd().collection("users").find();

    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ msg: "No users found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let cursor = client.bd().collection("users").find({ _id: id });

    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ msg: "user doesn't exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let { noms, adresse, telephone } = req.body;
    let result = await client
      .bd()
      .collection("users")
      .updateOne({ _id: id }, { $set: { noms, adresse, telephone } });

    if (result.modifiedCount == 1) {
      res.status(200).json({ msg: "update sucessfull" });
    } else {
      res.status(404).json({ msg: "user doesn't exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let result = await client.bd().collection("users").deleteOne({ _id: id });

    if (result.deletedCount == 1) {
      res.status(200).json({ msg: "delete sucessfull" });
    } else {
      res.status(404).json({ msg: "user doesn't exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
