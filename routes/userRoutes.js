import express from "express";
import { loginUser,signInUser,getUserData,deleteUser,UpdateUser} from "../controllers/user-controllers.js";
import middlewareAuth from '../controllers/MiddlewareAuth.js';
const userRoutes = express.Router();

userRoutes.route('/login')
.post(loginUser);

userRoutes.route('/signin')
.post(signInUser);

userRoutes.route('/user/:userId')
.put(middlewareAuth,UpdateUser)
.delete(middlewareAuth,deleteUser)
.get(middlewareAuth,getUserData);

export default userRoutes;