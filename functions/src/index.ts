import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ContactMessage } from './contact-message.model';
import * as rp from 'request-promise';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const checkRecaptcha = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(event => {
    const contactMessage: ContactMessage = event.data.data();
    if (!contactMessage.recaptcha) {
      return;
    }

    return rp({
      uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
      method: 'POST',
      formData: {
        secret: functions.config().recaptcha.secret,
        response: contactMessage.recaptcha
      },
      json: true
    }).then(result => {
      if (result.success) {
        console.info('recaptcha success', result);
        return event.data.ref.set({
          valid: true
        }, {merge: true});
      } else {
        console.warn('Recaptcha ' + contactMessage.recaptcha + ' is invalid', result);
      }
    }).catch(reason => {
      console.error('Recaptcha request failure for', contactMessage, 'reason', reason);
    });


  });

export const sendContactMessage = functions.firestore
  .document('contactMessages/{messageId}')
  .onUpdate(event => {
    const contactMessage: ContactMessage = event.data.data();
    const prevContactMessage: ContactMessage = event.data.previous.data();
    if (!contactMessage.recaptcha || prevContactMessage.valid || !contactMessage.valid) {
      console.error('could not send contact message for contactMessage', contactMessage, 'previous value', prevContactMessage);
      return Promise.resolve();
    }

    return db.collection('contactAddresses').get().then((snapshot) => {
      const emailArray = snapshot.docs.map(doc => doc.data().email);
      console.info('sending message to', emailArray);
      const mailOptions: Mail.Options = {
        from: `${contactMessage.name} <${contactMessage.email}>`,
        to: emailArray,
        subject: `[Smart software contact form]: ${contactMessage.subject}`,
        text: `Message from: ${contactMessage.name} <${contactMessage.email}>

${contactMessage.message}`
      };

      return mailTransport.sendMail(mailOptions).then(() => {
        console.info('New contact message:', JSON.stringify(contactMessage));
        return;
      });
    }).catch((err) => {
      console.error('Could not fetch email addresses', err);
    });

  });
