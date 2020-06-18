var express = require("express");
var mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
var multer  = require('multer');
require('dotenv').config();

require("../model/Image").Image;
var Image = mongoose.model("Image");

var LocalImage = require("../controller/LocalImage");
var PublicObject = require("../controller/PublicObject").PublicObject;

var Validation = require("../controller/Validation");

module.exports = {
	search: function (app) {
		app.get("/image/search", (req, res) => {
			const data = req.body;
			console.log(data);

			var validation = Validation.getByTitle(data);

			if (validation == true) {
				Image.find({ title: data.title, status: 1 }, {} , (err, images) => {
					res.status(200);

					var out = [];

					for (let image of images) {
						out.push(PublicObject.image(image));
					}

					res.json(out);
				});
			} else {
				res.status(409);
				res.json(validation.errors);
			}
		});
	},
	list: function (app) {
		app.get("/image/list", (req, res) => {
			Image.find({ status: 1 }, {}, (err, images) => {
				res.status(200);

				var out = [];

				for (let image of images) {
					out.push(PublicObject.image(image));
				}

				res.json(out);
			})
		});
	},
	get: function (app) {
		app.get("/image", (req, res) => {
			const data = req.body;
			console.log(data);

			var validation = Validation.get(data);

			if (validation == true) {
				Image.find({ uuid: data.uuid, status: 1 }, {}, (err, images) => {
					res.status(200);

					var out = [];

					for (let image of images) {
						out.push(PublicObject.image(image));
					}
					res.json(out);
				});
			} else {
				res.status(409);
				res.json(validation.errors);
			}
		});
	},
	static: function (app) {
		app.use("/static", express.static("static"));
	},

	upload: function (app) {
		var upload = multer({ dest: process.env.uploadPath });

		app.post("/image/upload", upload.single("image"), (req, res) => {

					var current = uuid();

					const output = {
						uuid: current,
						title: req.body.title,
						source: current + ".png",
						status: 1
					}

					if (!req.files) {
						const error = new Error('Please upload a file')
						error.httpStatusCode = 400
						res.send(error);
					  }

					//res.send(req.files.image);

					// save file
					
					var file = new LocalImage().save(output.uuid, req.files).then(() => {

						const image = new Image(output);

						image.save().then(() => {
							res.status(201);
							res.json(output.uuid);
							console.log("Create Image:  " + data);
						}).catch((err) => {
							console.log(err);
							res.status(500);
							res.send(err);
						});
					}).catch((err) => {
						console.log(err);
						res.status(500);
						res.json("Could not save Image");
					});

		});
	},
	post: function (app) {
		app.post("/image", (req, res) => {
			const data = req.body;
			console.log(data);
			var validation = Validation.upload(data);

			if (validation == true) {
				const output = {
					uuid: uuid(),
					title: data.title,
					source: data.source,
					status: 1
				}

				const image = new Image(output);

				// save image
				image.save().then(() => {
					res.status(201);
					res.json(output.uuid);
					console.log("Create Image:  " + data);
				}).catch((err) => {
					console.log(err);
					res.status(500);
					res.send(err);
				});
			} else {
				res.status(409);
				res.json(validation);
			}
		});
	},
	put: function (app) {
		app.put("/image", (req, res) => {
			const data = req.body;
			console.log(data);
			var validation = Validation.get(data);

			if (validation == true) {
				Image.updateOne({ uuid: data.uuid }, { status: data.status });
			} else {
				res.status(409);
				res.json(validation.errors);
			}
		});
	}
}
