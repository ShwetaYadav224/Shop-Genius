const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2client.getToken(code);
        oauth2client.setCredentials(tokens);

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
        const { email, name, picture } = userRes.data;

        let user = await UserModel.findOne({ email });
        if (!user) {
            user = await UserModel.create({
                name, email, image: picture
            });
        }

        const { _id } = user;
        const token = jwt.sign(
            { _id, email },
            process.env.JWT_SECRET || 'default_secret',  
            { expiresIn: process.env.JWT_TIMEOUT || '24h' }  
        );
        const userCredentialsResult = await getUserByEmail(email);
        res.status(200).json({
            message: "Welcome To Trip Genius!",
            success: true,
            email,
            userCredentialsResult
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

module.exports = googleLogin
