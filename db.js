const util = require("util");
const mysql = require("mysql");

// should be put in .env file
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "node_test2",
};

//https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
function makeDb(config) {
  const connection = mysql.createConnection(config);
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

async function findAll() {
  const db = makeDb(config);
  try {
    return await db.query("SELECT * FROM albums");
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
}

async function findOne(id) {
  if (!id) {
    return console.log("id required!");
  }
  const db = makeDb(config);
  try {
    const sql = "SELECT * FROM albums WHERE id = ?";
    const values = [[id]];
    return await db.query(sql, [values]);
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
}

async function create({ artist, title, year }) {
  if (!artist || !title || !year) {
    return console.log("all fields(artist, title, year) required!");
  }
  const db = makeDb(config);
  try {
    const sql = "INSERT INTO albums (artist, title, year) VALUES ?";
    const values = [[artist, title, year]];
    return await db.query(sql, [values]);
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
}

async function update({ artist, title, year, id }) {
  if (!artist || !title || !year || !id) {
    return console.log("all fields(artist, title, year, id) required!");
  }
  const db = makeDb(config);
  try {
    const sql =
      "UPDATE albums SET artist = ?, title = ?, year = ? WHERE id = ?";
    const values = [artist, title, year, id];
    return await db.query(sql, values);
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
}

async function remove(id) {
  if (!id) {
    return console.log("id required!");
  }
  const db = makeDb(config);
  try {
    const sql = "DELETE FROM albums WHERE id = ?";
    return await db.query(sql, [id]);
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
}
module.exports = { remove, update, create, findOne, findAll };
