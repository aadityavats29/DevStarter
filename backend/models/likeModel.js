import mongoose from 'mongoose';
const likeSchema = mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blogPost'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blogUser'
    },
    likedOn:{
        type:Date,
        required:true,
        default:Date.now()
    }
})
const Like = mongoose.model('blogLike',likeSchema);
export default Like;