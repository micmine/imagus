var mongoose = require('mongoose');
var uuid = require("uuid");

require("../model/Image").Image;
var Image = mongoose.model("Image");

var Validation = require("../controller/Validation");

module.exports = {
	search: function (app) {
		app.get("/image/search", (req, res) => {
			const data = req.body;
			console.log(data);

			var validation = Validation.getByTitle(data);

			if (validation == true) {
				Image.find({ title: data.title }, {} , (err, images) => {
					res.status(200);
					res.json(images);
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
				res.json(images);
			})
		});
	},
	get: function (app) {
		app.get("/image", (req, res) => {
			const data = req.body;
			console.log(data);

			var validation = Validation.get(data);

			if (validation == true) {
				Image.findOne({ uuid: data.uuid }, (err, img) => {
					//res.send(err);
					if (img == undefined) {
						//res.status(500);
						res.send("Nothing here");
					} else {
						//res.status(200);
						res.json(img.source);
					}
				});
			} else {
				res.status(409);
				res.json(validation.errors);
			}
			res.json(validation.errors);
		});
	},
	post: function (app) {
		app.post("/image", (req, res) => {
			const data = req.body;
			console.log(data);
			var validation = Validation.upload(data);
			console.log(data);
			if (validation == true) {
				const output = {
					uuid: uuid(),
					title: data.title,
					source: data.source,
					status: 1
				}

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
				res.send(err);
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

