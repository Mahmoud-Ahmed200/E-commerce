const transporter = require("../config/email");
const templates = require("../templates/email.template");
class EmailService {
  constructor() {
    this.transporter = transporter;
  }
  async sendEmail(to, subject, html) {
    try {
      const mailOptions = {
        from: `"E-Commerce" <${process.env.GOOGLE_EMAIL}>`,
        to,
        subject,
        html,
      };
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      return { id: info.messageId };
    } catch (error) {
      console.error("Error while sending email:", error);
    }
  }
  async sendVerificationEmail(to, fullName, link) {
    const subject = "Email verification";
    const html = templates.welcomeEmailTemplate(link, fullName);
    return await this.sendEmail(to, subject, html);
  }
  async passwordResetEmail(to, fullName, link) {
    const subject = "Password Reset Request";
    const html = templates.sendPasswordResetEmail(link, fullName);
    return await this.sendEmail(to, subject, html);
  }
  async verifyEmails() {
    try {
      await this.transporter.verify();
      console.log("Server is ready to take our messages");
      return true;
    } catch (error) {
      console.error("Email verification failed", error);
      return false;
    }
  }
}

module.exports = new EmailService();
