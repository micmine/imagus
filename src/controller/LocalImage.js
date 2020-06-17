const sharp = require('sharp');
require('dotenv').config();

class LocalImage {

	constructor() {
		this.uploadPath = process.env.uploadPath;
	}

	save(uuid, image) {
		return new Promise((resolve, reject) => {
			sharp(image)
				.resize(1280, 720)
				.png()
				.toFile(this.uploadPath + uuid + ".png", (err, info) => {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						resolve(info);
					}
				});
		});
	}

}

module.exports = LocalImage;
