
const sendEmail = require('./emailSetup.js');
const tokenHelper = require('../../utils/tokenHelper.js');


async function sendVerifyEmail(user) {

  const token = tokenHelper.generateEmailToken(user._id);
  const link = `${process.env.SERVER_BASE_URL}/api/email/email-verify?token=${token}`;

  const html = `
    <h1>Email Verification</h1>
    <p>Welcome ${user.email}</p>
    <p>Click the link below to verify your email address:</p>
    <a href="${link}" target="_blank">Verify Email</a>
  `;

  await sendEmail(user.email, "Verify Your Email", html);
}


const verifyEmail = async (req, res) => {
  const { token } = req.query;
    if (!token) {
        throw new SendError("Invalid or missing token", 400);
    }
    const decoded = tokenHelper.verifyEmailToken(token);
    const userId = decoded.userId;

    const user = await userService.findUserById(userId);
    if (!user) {
        throw new SendError("User not found", 404);
    }
    user.isEmailVerified = true;
    await user.save();
}

module.exports = {
    sendVerifyEmail,
    verifyEmail
}