var compression = require('compression');
var express = require("express");

var multer  = require('multer');
var ImageRouter = require("./routes/ImageRouter");

var upload = multer({ dest: process.env.uploadPath });

// load exress
var app = express();
app.use(express.json());
app.use(compression());

// add routes
ImageRouter.static(app);

ImageRouter.list(app);
ImageRouter.search(app);
ImageRouter.get(app);

ImageRouter.upload(app);
ImageRouter.post(app);

// start server
app.listen(8000, () => console.log(`Example app listening on port 8000`));
