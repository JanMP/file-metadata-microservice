'use strict'

express = require "express"
app = express()
require("dotenv").load()
path = process.cwd()

multer = require "multer"
storage = multer.memoryStorage()
upload = multer
  storage : storage

app.use('/public', express.static(__dirname + '/public'))

app.get "/", (req, res) ->
  res.sendFile path + "/public/index.html"
  
app.post "/upload", upload.single("file"), (req, res) ->
  if req.file?
    res.send
      name : req.file.originalname
      size : req.file.size
      mimetype : req.file.mimetype
  else
    res.send
      error : "could not read file metadata"

port = process.env.PORT or 8080
app.listen port, ->
  console.log "Server listening on port #{port}..."