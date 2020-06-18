require('dotenv').config();

class PublicObject {

	constructor() {
		this.address = process.env.address;
		this.uploadPath = process.env.uploadPath;
	}

	image(image) {
		var url = image.source;
		if (!image.source.startsWith("http")) {
			url = this.address + this.uploadPath + image.uuid + ".png";
		}

		var output = {
			uuid: image.uuid,
			title: image.title,
			source: url
		}

		return output;
	}
}

module.exports = PublicObject;
