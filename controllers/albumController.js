const { remove, findOne, findAll, update, create } = require("../db");

exports.list_all_albums = async (req, res) => {
  try {
    let data = await findAll();
    res.json(data);
  } catch (error) {
    res.status(404).send("not found");
  }
};

exports.create_album = async (req, res) => {
  try {
    await create(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).send("couldn't create");
  }
};

exports.update_album = async (req, res) => {
  try {
    const album = req.body;
    album.id = req.params.albumId;
    await update(album);
    res.json(album);
  } catch (error) {
    res.status(400).send("couldn't update");
  }
};
exports.read_album = async (req, res) => {
  try {
    let data = await findOne(req.params.albumId);
    res.json(data);
  } catch (error) {
    res.status(404).send("not found");
  }
};

exports.delete_album = async (req, res) => {
  try {
    await remove(req.params.albumId);
    res.json({ message: "Task successfully deleted" });
  } catch (error) {
    res.status(400).send("couldn't delete");
  }
};
