const sharp = require('sharp');
require('dotenv').config();

class LocalImage {

	constructor() {
		this.uploadPath = process.env.uploadPath;
	}

	save(uuid, image) {
		return new Promise((resolve, reject) => {
			console.log(image.path);
			sharp(image.path)
				.resize(1280, 720, {
					fit: sharp.fit.inside,
					withoutEnlargement: true
				  })
				.png()
				.toFile(this.uploadPath + uuid + ".png", (err, info) => {
					if (err) {
						reject(err);
					} else {
						resolve(info);
					}
				});
		});
	}

}

module.exports = LocalImage;
