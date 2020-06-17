var compression = require('compression');
var express = require("express");

var Image = require("./routes/Image");

var app = express();
app.use(express.json());
app.use(compression());

Image.list(app);
Image.search(app);
Image.get(app);

Image.post(app);

app.listen(8000, () => console.log(`Example app listening on port 8000`));
