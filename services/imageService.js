import cloudinary from '../lib/cloudinary';

const uploadImage = (image) => {
    return cloudinary.uploader.upload(image, {
        folder: 'event-images',
    });
};

export default uploadImage;