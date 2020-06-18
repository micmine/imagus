var compression = require('compression');
var express = require("express");
var fileupload = require("express-fileupload");

var ImageRouter = require("./routes/ImageRouter");

// load exress
var app = express();
app.use(express.json());
app.use(compression());
app.use(fileupload());

// add routes
ImageRouter.static(app);

ImageRouter.list(app);
ImageRouter.search(app);
ImageRouter.get(app);

ImageRouter.upload(app);
ImageRouter.post(app);

// start server
app.listen(8000, () => console.log(`Example app listening on port 8000`));
