import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import Like from "../models/likeModel.js";
import Comment from "../models/comment.js";

export const createBlog = async (req, res) => {
    try {
        if (!req.body.description || !req.body.title || !req.body.data || !req.body.category) {
            return res.status(400).json({
                status: 'fail',
                message: 'All Fields are required'
            })
        }
        console.log(req.body);
        const userId = req.params.userId;
        const newBlog = new Blog({
            image: req.body.image,
            title: req.body.title,
            author: userId,
            category: req.body.category,
            data: req.body.data,
            description: req.body.description
        })
        const user = await User.findById(userId);
        user.totalPost = user.totalPost + 1;
        if(user.totalPost<0){
            user.totalPost = 0;
        }
        await user.save();
        await newBlog.save();
        return res.status(201).json({
            status: 'success',
            message: 'New Blog is Created'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'There is an error while creating Blog'
        })
    }
}

export const getUserBlog = async (req, res) => {
    try {
        const userId = req.params.userId;
        const allBlog = await Blog.find({ author: userId });
        if (allBlog.length == 0) {
            
            return res.status(204).json({
                message: 'No Blog is found'
            })
        }
        return res.status(200).json({
            status: 'success',
            Blogs: allBlog
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'There is an error while Getting all Blogs'
        })
    }
}

export const getSelectedBlog = async (req, res) => {
    try {
        if (req.query.input!=null) {
            const regex = new RegExp(req.query.input, 'i');
            const filteredBlogs = await Blog.find({
                $or: [
                    { title: regex },
                    { description: regex },
                    { category: regex },
                    { data:regex }
                ],
            }).limit(30);
            if (filteredBlogs.length == 0) {
                return res.status(204).json({
                    message: "No Blog Found",
                    Blogs: []
                })
            }
            return res.status(200).json({
                status: 'success',
                Blogs: filteredBlogs
            })
        } else {
            const type = req.params.type;
            const Blogs = await (type === 'all' ? Blog.find({}).limit(20) : Blog.find({ category: type }).limit(20)).sort({createdAt:-1});   
            if (Blogs.length == 0) {
                return res.status(204).json({
                    message: "No Blog Found",
                    Blogs: []
                })
            }
            return res.status(200).json({
                status: 'success',
                Blogs: Blogs
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while getting all the blog'
        })
    }
}


export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const updateBlog = await Blog.findOneAndUpdate({ _id: blogId }, { $set: req.body, updatedAt: Date.now() }, { new: true });
        if (updateBlog == null) {
            return res.status(400).json({
                message: 'No Blog with this Id is present'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'Blog is Updated'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while updating the Blog'
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const deleteBlog = await Blog.findByIdAndDelete(blogId);
        const user = await User.findById(deleteBlog.author);
        user.totalPost = user.totalPost - 1;
        user.save();
        if (!deleteBlog) {
            return res.status(400).json({
                message: 'Blog is Not Deleted'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'Blog is Deleted'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while deleting the Blog'
        })
    }

}
export const getSingleBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const getBlog = await Blog.findById(blogId).populate('author');
        if (getBlog == null) {
            return res.status(400).json({
                status: 'fail',
                message: 'No Blog Exist'
            })
        }
        return res.status(200).json({
            status: 'success',
            blog: getBlog
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while getting a single blog'
        })
    }
}

export const LikedOrDisliked = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const LikedOrDis = await Like.findOne({ blogId: blogId, userId: req.body.userId });
        if (LikedOrDis != null) {
            await Like.findOneAndDelete({ blogId: blogId, userId: req.body.userId });
            const findUser = await User.findById(req.body.authorId);
            findUser.totalLikes = findUser.totalLikes - 1;
            findUser.save();
            console.log()
            console.log()
            console.log()
            console.log()
            console.log()
            const blog = await Blog.findById(blogId);
            blog.totalLikes = blog.totalLikes - 1;
            blog.save();
            return res.status(200).json({
                status: 'success',
                likedBlog: false,
                message: 'Blog is DisLiked'
            })
        }
        const createLiked = new Like({
            userId: req.body.userId,
            blogId: req.params.blogId
        })
        await createLiked.save();
        const findUser = await User.findById(req.body.authorId);
        findUser.totalLikes = findUser.totalLikes + 1;
        findUser.save();
        const blog = await Blog.findById(blogId);
        blog.totalLikes = blog.totalLikes + 1;
        blog.save();

        return res.status(200).json({
            status: 'success',
            likedBlog: true,
            message: 'Blog is Liked'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while Liking the Blog'
        })
    }
}

export const checkIfLike = async (req,res)=>{
    try{
        const blogId = req.params.blogId;
        const response = await Like.findOne({ blogId: blogId, userId: req.headers.userid });
        if(response){
            return res.status(200).json({
                status:'success'
            })
        } else{
            return res.status(200).json({
                status:'empty'
            })
        }
    } catch(error){
        return res.status(500).json({
            status: 'fail',
            message: 'Error while Liking the Blog'
        })
    }
}
export const getComment = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blogComment = await Comment.find({ blogId: blogId }).populate('userId', 'image username email');
        if (blogComment == null) {
            return res.status(401).json({
                status: 'fail',
                message: 'No Commentis Found'
            })
        }
        return res.status(200).json({
            status: 'success',
            comments: blogComment,
            lenComment: blogComment.length,
            message: 'Comments are Found'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while getting all the comment for the Blog'
        })
    }
}

export const createComment = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.body.userId;
        const createComm = new Comment({
            blogId: blogId,
            userId: userId,
            comment: req.body.comment
        })
        await createComm.save();
        return res.status(201).json({
            status: 'success',
            message: 'New Comment is Created'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: 'fail',
            message: 'Error while creating a new Comment'
        })
    }
}
export const deleteComment = async (req, res) => {
    try {
        const findComment = await Comment.findOneAndDelete({ blogId: req.params.blogId });
        if (!findComment) {
            return res.status(401).json({
                status: 'fail',
                message: 'No Comment is there with this Id'
            })
        }
        return res.status(200).json({
            status: 'success',
            message: 'Comment is Deleted'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while deleting the Comment'
        })
    }
}

export const Bookmark = async (req,res)=>{
    try{
        const blogId = req.params.blogId;
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const ifBookMarked = await user.bookMarked.includes(blogId);
        if(ifBookMarked){
            user.bookMarked = user.bookMarked.filter(id=> !id.equals(blogId));
            await user.save();
            return res.status(200).json({
                status:'success',
                bookmark:false,
                message:'bookmark removed successfully'
            })
        }
        user.bookMarked.push(blogId);   
        await user.save();
        return res.status(200).json({
            status:'success',
            bookmark:true,
            message:'bookmark added successfully'
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error if bookmark a Blog'
        })
    }
}


export const checkBookMark = async (req,res)=>{
    try{
        const blogId = req.params.blogId;
        const user = await User.findById(req.headers.userid);
        if(!user){
            return res.status(404).json({
                message:"User not Found"
            })
        }
        const bookmarked = user.bookMarked.includes(blogId);
        if(bookmarked){
            return res.status(200).json({
                status:'success',
                bookmark :true,
                message:'Bookmark found'
            });
        }
        return res.status(200).json({
            status:'empty',
            bookmark:false,
            message:'Bookmark not found'
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while check if Bookmark Exist'
        })
    }
}