import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20,
        match: /^[a-zA-Z0-9_-]+$/,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQLZBLliHC0oAh1vMfI7Z5IzTV8_RlzVeh6QqSzs_SCqn5a0rkuXEoVsuDPNxMntF0vc&usqp=CAU'
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        unique:true,
        required:true,
        minlength:6,
        select:false
    },
    image:{
        type:String,
        default:0
    },
    totalLikes:{
        type:Number,
        default:0
    },
    totalPost:{
        type:Number,
        default:0
    },
    bookMarked:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogPost'
    }],
    admin:{
        type:Boolean,
        default:0
    }
})
const User = mongoose.model('blogUser',userSchema);
export default User;