import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const { UKR_NET_PASSWORD, UKR_NET_FROM } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   from: UKR_NET_FROM,
//   to: 'artsatanov@gmail.com',
//   subject: 'Test email',
//   html: '<strong>Test email</strong>',
// };

// transport
//   .sendMail(email)
//   .then(() => console.log('email sent'))
//   .catch(() => console.log('email not sent'));

const sendEmail = data => {
  const emial = { ...data, form: UKR_NET_FROM };
  return transport.sendMail(email);
};

export default sendEmail;
