import connectDB from '../../../lib/mongo';
import Blog from '../../../models/Blog';

connectDB();

export default async (req, res) => {
    const { id } = req.query;
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const blog = await Blog.findById(id);

                if (!blog) {
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: blog});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'PUT':
            try {
                const blog = await Blog.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!blog) {
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: blog});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'DELETE':
            try {
                const deletedBlog = await Blog.deleteOne({_id: id});

                if (!deletedBlog) {
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: {}});
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}