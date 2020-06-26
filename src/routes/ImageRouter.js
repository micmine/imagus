var express = require("express");
var mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
var multer = require("multer");
require("dotenv").config();

require("../model/Image").Image;
var Image = mongoose.model("Image");

var LocalImage = require("../controller/LocalImage");
var PublicObject = require("../controller/PublicObject");

var Validation = require("../controller/Validation");

module.exports = {
	search: function (app) {
		app.get("/image/search", (req, res) => {
			const data = req.body;
			console.log(data);

			var validation = Validation.getByTitle(data);

			if (validation == true) {
				Image.find({ title: data.title, status: 1 }, {}, (err, images) => {
					res.status(200);

					var out = [];

					var publicObject = new PublicObject();

					images.forEach((image) => {
						out.push(publicObject.image(image));
					});

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

				var publicObject = new PublicObject();

				images.forEach((image) => {
					out.push(publicObject.image(image));
				});

				res.json(out);
			});
		});
	},
	get: function (app) {
		app.post("/image", (req, res) => {
			const data = req.body;
			console.log(data);

			var validation = Validation.get(data);

			if (validation == true) {
				Image.find({ uuid: data.uuid, status: 1 }, {}, (err, images) => {
					res.status(200);

					var out = [];

					var publicObject = new PublicObject();

					images.forEach((image) => {
						out.push(publicObject.image(image));
					});

					res.json(out[0]);
				});
			} else {
				res.status(409);
				res.json(validation.errors);
			}
		});
	},
	public: function (app) {
		app.use("/public", express.static("public"));
	},

	upload: function (app) {
		var upload = multer({ dest: process.env.uploadPath });

		app.post("/image/upload", upload.single("image"), (req, res) => {
			var current = uuid();

			const output = {
				uuid: current,
				title: req.body.title,
				source: current + ".png",
				status: 1,
			};

			if (!req.file) {
				const error = new Error("Please upload a file");
				error.httpStatusCode = 400;
				res.send(error);
			}

			var file = new LocalImage()
				.save(output.uuid, req.file)
				.then(() => {
					const image = new Image(output);

					image.save()
						.then(() => {
							res.status(201);
							//res.json(output.uuid);
							console.log("Create Image");
						})
						.catch((err) => {
							console.log(err);
							res.status(500);
							res.send(err);
						});
				}).catch((err) => {
					console.log(err);
					res.status(500);
					res.json("Could not save Image");
				}).finally(() => {
					res.redirect(req.body.redirect);
				});
		});
	},
	addImage: function (app) {
		app.post("/image/url", (req, res) => {
			const data = req.body;
			console.log(data);
			var validation = Validation.upload(data);

			if (validation == true) {
				const output = {
					uuid: uuid(),
					title: data.title,
					source: data.source,
					status: 1,
				};

				const image = new Image(output);

				// save image
				image.save()
					.then(() => {
						res.status(201);
						res.json(output.uuid);
						console.log("Create Image:  " + data);
					})
					.catch((err) => {
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
				let image = {};

				if (typeof data.title !== 'undefined' && data.title !== null) {
					image.title = data.title;
				}

				if (typeof data.status !== 'undefined' && data.status !== null) {
					image.status = data.status;
				}

				Image.updateOne({ uuid: data.uuid }, image).then(() => {
					res.status(201);
					res.send("OK");
				}).catch((error) => {
					res.status(500);
					res.json(error);
					console.log(error)
				});
			} else {
				res.status(409);
				res.json(validation.errors);
			}
		});
	},
};
