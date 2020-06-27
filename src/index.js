var compression = require("compression");
var express = require("express");
var cors = require('cors');

const Keycloak = require('keycloak-connect');
const session = require('express-session');

var multer = require("multer");
var ImageRouter = require("./routes/ImageRouter");

var upload = multer({ dest: process.env.uploadPath });

// load exress
var app = express();

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

//session
app.use(session({
  secret:'thisShouldBeLongAndSecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware());


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
