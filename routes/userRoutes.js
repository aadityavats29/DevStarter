import express from "express";
import { loginUser,signInUser,getUserData,deleteUser} from "../controllers/user-controllers.js";
import middlewareAuth from '../controllers/MiddlewareAuth.js';
const userRoutes = express.Router();

userRoutes.route('/login')
.post(loginUser);

userRoutes.route('/signin')
.post(signInUser);

userRoutes.route('/user/:userId')
.delete(middlewareAuth,deleteUser)
.get(middlewareAuth,getUserData);

export default userRoutes;