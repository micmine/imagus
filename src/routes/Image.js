var mongoose = require('mongoose');

require("../model/Image").Image;
var Image = mongoose.model("Image");

import { v4 as uuid } from 'uuid';
var Validation = require("../controller/Validation");

module.exports = {
	get: function (app) {
		app.get("/image", (req, res) => {
			const data = req.body;
			console.log(data);

			var validation = Validation.measure(data);

			if (validation == true) {
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
			var validation = Validation.measure(data);

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

			} else {
				res.status(409);
				res.json(validation.errors);
			}
		});
	},
	put: function (app) {
		app.put("/image", (req, res) => {
			const data = req.body;
			console.log(data);
			var validation = Validation.measure(data);

			if (validation == true) {
			} else {
				res.status(409);
				res.json(validation.errors);
			}
		});
	}
}
