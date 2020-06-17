require('dotenv').config();

class PublicObject {

	image(image) {
		var url = image.source;
		if (!image.source.startsWith("http")) {
			url = process.env.address + process.env.uploadPath + image.uuid + ".png";
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
