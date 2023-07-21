const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [200, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [3000, 'Description cannot be more than 3000 characters']
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);