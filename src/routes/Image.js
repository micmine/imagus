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
				Image.find({ title: data.title, status: 1 }, {} , (err, images) => {
					res.status(200);

					var out = [];

					for (let image of images) {
						var element = {
							uuid: image.uuid,
							title: image.title,
							source: image.source
						}
						out.push(element);
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
					var element = {
						uuid: image.uuid,
						title: image.title,
						source: image.source
					}
					out.push(element);
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
						var element = {
							uuid: image.uuid,
							title: image.title,	
							source: image.source
						}
						out.push(element);
					}
					res.json(out);
				});
			} else {
				res.status(409);
				res.json(validation.errors);
			}
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

