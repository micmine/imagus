var compression = require("compression");
var express = require("express");
var cors = require('cors');
var session = require('express-session');


var Auth = require("./Auth");

var multer = require("multer");
var ImageRouter = require("./routes/ImageRouter");

var upload = multer({ dest: process.env.uploadPath });

// load exress
var app = express();

let auth = new Auth();
auth.init();

app.use(session({
	secret:'thisShouldBeLongAndSecret',
	resave: false,
	saveUninitialized: true,
	store: auth.getMemoryStore()
}));

app.use(auth.getKeycloak().middleware());


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
