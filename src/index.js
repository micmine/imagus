var compression = require("compression");
var express = require("express");
var cors = require('cors');

var multer = require("multer");
var ImageRouter = require("./routes/ImageRouter");

var upload = multer({ dest: process.env.uploadPath });

// load exress
var app = express();
app.use(express.json());
app.use(compression());
app.use(cors());

// add routes
ImageRouter.public(app);

ImageRouter.list(app);
ImageRouter.search(app);
ImageRouter.get(app);

ImageRouter.upload(app);
ImageRouter.addImage(app);
ImageRouter.put(app);

// start server
app.listen(8000, () => console.log(`Example app listening on port 8000`));
