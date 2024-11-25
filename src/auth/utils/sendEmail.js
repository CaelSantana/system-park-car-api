const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ocaelsantana@gmail.com',
        pass: 'CaeL@2025gmail', // Use a senha de aplicativo se a 2FA estiver ativada
      },
    });

    const mailOptions = {
      from: 'ocaelsantana@gmail.com',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
