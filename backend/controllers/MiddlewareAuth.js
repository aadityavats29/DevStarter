import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const middlewareAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({
                status: 'fail',
                message: 'No JWT token found or invalid format',
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify Token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

        // Attach user info to request
        req.username = decoded.username;
        req.email = decoded.email;
        req.image = decoded.image;
        req.totalLikes = decoded.totalLikes;
        req.totalPost = decoded.totalPost;
        req.id = decoded._id;

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(401).json({
            status: 'fail',
            message: 'Authentication failed, invalid token',
        });
    }
};

export default middlewareAuth;
