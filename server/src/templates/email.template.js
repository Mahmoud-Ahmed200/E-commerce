const welcomeEmailTemplate = (link, fullName) => {
  return `
 <!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #4caf50;
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 5px 5px 0 0;
      }
      .content {
        background-color: #f9f9f9;
        padding: 30px;
        border-radius: 0 0 5px 5px;
      }
      .button {
        width: 20%;
        display: block;
        background-color: #4caf50;
        color: white;
        padding: 12px 30px;
        text-decoration: none;
        border-radius: 5px;
        margin: 30px auto;
        text-align: center;
      }
      .footer {
        text-align: center;
        color: #999;
        font-size: 12px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Smart Tech!</h1>
      </div>
      <div class="content">
        <h2>Hello ${fullName}!</h2>
        <p>Thank you for signing up. We're excited to have you on board.</p>
        <p>Get started by verifying your account:</p>
        <a href="${link}" class="button">Verify account</a>
        <p>If you have any questions, feel free to reply to this email.</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Smart Tech. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
};
const sendPasswordResetEmail = (link, fullName) => {
  return `
  <!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4CAF50;
        color: white;
        padding: 30px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .content {
        padding: 40px 30px;
      }
      .content h2 {
        color: #333;
        margin-top: 0;
      }
      .button {
        display: block;
        width: 25%;
        text-align: center;
        background-color: #4CAF50;
        color: white;
        padding: 20px 40px;
        text-decoration: none;
        border-radius: 5px;
        margin: 20px auto;
        font-weight: bold;
      }
      .footer {
        background-color: #f9fafb;
        padding: 20px;
        text-align: center;
        color: #6b7280;
        font-size: 14px;
      }
      .upFooter{
        margin-top: 2rem;
        font-size: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Smart Tech</h1>
      </div>
      <div class="content">
        <h2>Password Reset Request</h2>
        <p>Hello ${fullName},</p>
        <p>
          We received a request to reset your password for your Smart Tech
          account.
        </p>
        <p>Click the button below to reset your password:</p>
        <a href="${link}" class="button">Reset Password</a>
        <div class="upFooter">  <p>
          If you didn't request a password reset, please ignore this email. Your
          password will remain unchanged.
        </p>
        <p>For security reasons, never share this link with anyone.</p></div>
      </div>
      <div class="footer">
        <p>&copy; 2025 Smart Tech. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
  `;
};
module.exports = {
  welcomeEmailTemplate,
  sendPasswordResetEmail,
};
