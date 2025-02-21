const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { sub, email, name, picture } = ticket.getPayload();

        let user = await User.findOne({ googleId: sub });
        if (!user) {
            user = await User.create({
                googleId: sub,
                email,
                name,
                avatar: picture
            });
        }

        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return {
            token: jwtToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar
            }
        };
    } catch (error) {
        throw new Error('Google authentication failed: ' + error.message);
    }
};

module.exports = { googleLogin };