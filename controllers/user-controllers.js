import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Blog from "../models/blogModel.js";

export const signInUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.status(400).json({
                status: 'fail',
                message: "All Fields are Required"
            })
        }
        const existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });
        if (existingUser) {
            return res.status(409).json({
                status: 'fail',
                message: 'Either username or Email already Exist'
            })
        }
        const HashesPass = await bcrypt.hash(req.body.password, 5);
        const newUser = new User({
            username: req.body.username,
            password: HashesPass,
            email: req.body.email,
            image: req.body.image
        })
        await newUser.save();
        return res.status(201).json({
            status: 'success',
            message: 'User Created'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'fail',
            message: 'Problem while Creating a new user'
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                status: 'fail',
                message: 'All Fields are required'
            })
        }
        const findUser = await User.findOne({ email: req.body.email }).select('+password')
        console.log(!findUser);
        if (!findUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'User Not Exist'
            })
        }
        const { password, ...userWithoutPassword } = findUser.toJSON();
        const ComparePass = await bcrypt.compare(req.body.password, findUser.password);
        if (!ComparePass) {
            return res.status(400).json({
                status: 'fail',
                message: 'Either Username or Password is Invalid'
            })
        }
        const jsonToken = await jwt.sign(userWithoutPassword, process.env.secret_key, { expiresIn: '25d' });
        res.status(200).json({
            status: 'success',
            message: 'Login Success',
            id: findUser._id,
            token: `Bearer ${jsonToken}`,
            username: findUser.username,
            email: findUser.email,
            image: findUser.image,
            totalLikes: findUser.totalLikes,
            totalPost: findUser.totalPost,
            admin: findUser.admin,
        })
    } catch (err) {
        console.log("Error while Logging the user ", err);
        res.status(500).json({
            status: 'fail',
            message: "Error While Logging the User",
        });
    }
}

export const getUserData = async (req, res) => {
    try {
        const response = await User.findById(req.params.userId).populate({
            path: 'bookMarked',
            select: 'title description image'
        });

        return res.status(200).json({
            status: 'success',
            username: response.username,
            email: response.email,
            image: response.image,
            totalLikes: response.totalLikes,
            totalPost: response.totalPost,
            Bookmark: response.bookMarked
        })
    } catch (error) {
        console.log("Error while get a Single user data", error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while getting User Details'
        })
    }
}
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (userId === req.id) {
            await Blog.findOneAndDelete({ author: userId });
            await User.findByIdAndDelete(userId);
            return res.status(200).json({
                status: 'success',
                message: 'User is Deleted'
            })
        } else {
            console.log("User is Not validate");
            return res.status(401).json({
                status: 'fail',
                message: "Cannot complete action, User is not validate"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: "Error while deleting all user"
        })
    }
}

export const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email } = req.body;

        if (username) {
            const existingUserWithUsername = await User.findOne({ username, _id: { $ne: userId } });
            if (existingUserWithUsername) {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Username already exists'
                });
            }
        }

        if (email) {
            const existingUserWithEmail = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUserWithEmail) {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Email already exists'
                });
            }
        }
        const UserData = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true
        });

        if (!UserData) {
            return res.status(401).json({
                status: 'fail',
                message: "No user Found"
            })
        }
        return res.status(200).json({
            status: 'success',
            message: "User Details are updated"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: "Error while updating the user"
        })
    }
}