"use strict";

module.exports = function (app) {
  const albumList = require("../controllers/albumController");

  // albumList Routes
  app
    .route("/albums")
    .get(albumList.list_all_albums)
    .post(albumList.create_album);

  app
    .route("/albums/:albumId")
    .get(albumList.read_album)
    .put(albumList.update_album)
    .delete(albumList.delete_album);
};
