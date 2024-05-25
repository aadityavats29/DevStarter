import mongoose from 'mongoose';

const blogSchema = {
    image:{
        type:String,
        required:true,
        default:"https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg",
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogUser',
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    data:{
        type:String,
        required:true
    },
    totalLikes:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
}

const Blog = mongoose.model('blogPost',blogSchema);
export default Blog;