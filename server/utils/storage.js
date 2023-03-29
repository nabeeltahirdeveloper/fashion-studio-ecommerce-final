const cloudinary = require('cloudinary').v2;
const keys = require('../config/keys');

cloudinary.config({
  cloud_name: keys.cloudinary.cloud_name,
  api_key: keys.cloudinary.api_key,
  api_secret: keys.cloudinary.api_secret
});


exports.s3Upload = async image => {
  let imageUrl = '';
  let imageKey = '';
  try{

    if (image) {

      return new Promise((resolve, reject) => {
        const binaryImageData = Buffer.from(image.buffer);

        cloudinary.uploader.upload_stream({ 
          resource_type: 'image', 
          public_id: `images/${image.originalname}/${Date.now()}`,  
        }, (error, result) => { 
          imageKey = result.public_id;
          imageUrl = result.secure_url;
          resolve({ imageUrl, imageKey });
        }).end(binaryImageData);
      })

      
      
      
    }
    else {
      console.log('No image found');
    }
  }
  catch(err){
    console.log(err);
  }
};
