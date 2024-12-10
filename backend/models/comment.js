import mongoose from 'mongoose';
const commentSchema = mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blogPost'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blogUser',
    },
    comment:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})
const Comment = mongoose.model('blogComment',commentSchema);
export default Comment;