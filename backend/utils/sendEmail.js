const nodemailer = require("nodemailer");
class Email {
  constructor(user, url, message) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Expecto Patronum <${process.env.EMAIL_FROM}>`;
    this.message = message;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      const transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
      return transporter;
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    return transporter;
  }

  async send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: this.message,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async confirmAccount() {
    await this.send("Welcome to Expecto Patronum");
  }

  async resetPassword() {
    await this.send("Password reset");
  }
}

module.exports = Email;
