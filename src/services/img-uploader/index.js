const cloudinary = require('cloudinary').v2;

const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUDNAME,
  // CLOUDINARY_UPLOAD_PRESET,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUDNAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/**
 * Given Cloudinary secureUrl, get publicId
 * @param {string} secureUrl
 * @returns {string} publicId
 * @example
 * secureUrl = 'https://res.cloudinary.com/dp4vo5nq4/image/upload/v1574588817/aunpy1ksyr2yaykueivh.jpg'
 * publicId = 'aunpy1ksyr2yaykueivh'
 */
const getPublicId = (secureUrl) => {
  const chunks = secureUrl.split('/');
  const { length } = chunks;
  const end = chunks[length - 1];
  return end.split('.')[0];
};

class ImgUploader {
  constructor(service) {
    this.service = service;
  }

  deleteImg(secureUrl) {
    if (!secureUrl) {
      return Promise.resolve(null);
    }

    const publicId = getPublicId(secureUrl);
    return this.service.uploader.destroy(publicId); // promise
  }
}

module.exports = { imgUploader: new ImgUploader(cloudinary) };
