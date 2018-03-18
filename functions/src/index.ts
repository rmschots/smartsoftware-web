import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ContactMessage } from './contact-message.model';

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const sendContactMessage = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(event => {
    const contactMessage: ContactMessage = event.data.data();
    const mailOptions: Mail.Options = {
      from: `${contactMessage.name} <${contactMessage.email}>`,
      to: 'mangelschotsroel@gmail.com',
      subject: `[Smart software contact form]: ${contactMessage.subject}`,
      text: `Message from: ${contactMessage.name} <${contactMessage.email}>

${contactMessage.message}`
    };

    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New contact message:', JSON.stringify(contactMessage));
      return;
    });
  });
