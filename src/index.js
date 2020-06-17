var compression = require('compression');
var express = require("express");
var fileupload = require("express-fileupload");

var Image = require("./routes/Image");

var app = express();
app.use(express.json());
app.use(compression());
app.use(fileupload());

Image.list(app);
Image.search(app);
Image.get(app);

Image.upload(app);
Image.post(app);

app.listen(8000, () => console.log(`Example app listening on port 8000`));
