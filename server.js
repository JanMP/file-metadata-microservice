// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var app, express, multer, path, port, storage, upload;

  express = require("express");

  app = express();

  require("dotenv").load();

  path = process.cwd();

  multer = require("multer");

  storage = multer.memoryStorage();

  upload = multer({
    storage: storage
  });

  app.use('/public', express["static"](__dirname + '/public'));

  app.get("/", function(req, res) {
    return res.sendFile(path + "/public/index.html");
  });

  app.post("/upload", upload.single("file"), function(req, res) {
    if (req.file != null) {
      return res.send({
        name: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    } else {
      return res.send({
        error: "could not read file metadata"
      });
    }
  });

  port = process.env.PORT || 8080;

  app.listen(port, function() {
    return console.log("Server listening on port " + port + "...");
  });

}).call(this);
