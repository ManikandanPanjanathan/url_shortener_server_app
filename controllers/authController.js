const { googleLogin } = require('../services/authService');

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({
                error: 'Bad request',
                message: 'Google token is required'
            });
        }

        const result = await googleLogin(token);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(401).json({
            error: 'Authentication failed',
            message: error.message
        });
    }
};