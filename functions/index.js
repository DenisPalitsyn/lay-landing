const functions = require("firebase-functions");
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporterInbox = nodemailer.createTransport(
  {
    host: 'mail.inbox.lv',
    port: 587,
    secure: false, // true for 465
    pool: true,
    auth: {
      user: 'laysup@inbox.lv',
      pass: 'jAA6?q8bUU'
    },
  },
  {
    from: 'Lay Support <laysup@inbox.lv>'
  }
);

const transporterGmail = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465
    pool: true,
    auth: {
      user: 'support@lay.ooo',
      pass: '!L4yr0ckz2022'
    },
  },
  {
    from: 'Lay Support <support@lay.ooo>'
  }
);

const transporterGmx = nodemailer.createTransport(
  {
    host: 'mail.gmx.net',
    port: 587,
    secure: false, // true for 465
    pool: true,
    auth: {
      user: 'lay.stutzen@gmx.de',
      pass: '!L4yr0ckz2022'
    },
  },
  {
    from: 'Lay Support <lay.stutzen@gmx.de>'
  }
);

function template() {
  return `<p>Привет!</p>
<p>Это тестовое письмо. Чтоб попасть на lay.ooo, перейди по этой <a href="https://lay.ooo">ссылке</a>.<br>
Если это письмо пришло тебе по ошибке, просто игнорируй его.<br>
<p>С уважением,<br>Команда Lay</p>`;
}

async function sendEmail(email, subject, htmlTemplate, cb) {
  if (email.endsWith('@inbox.lv')) {
    return transporterInbox.sendMail({
      to: email,
      subject: subject,
      html: htmlTemplate
    }, (err) => {
      if (err) {
        console.log(`Error with ${email}`, err.message);
      } else {
        cb && cb();
        console.log('Email were send to', email);
      }
    });
  }
  if (email.endsWith('.de')) {
    return transporterGmx.sendMail({
      to: email,
      subject: subject,
      html: htmlTemplate
    }, (err) => {
      if (err) {
        console.log(`Error with ${email}`, err.message);
      } else {
        cb && cb();
        console.log('Email were send to', email);
      }
    });
  }
  return transporterGmail.sendMail({
    to: email,
    subject: subject,
    html: htmlTemplate
  }, (err) => {
    if (err) {
      console.log(`Error with ${email}`, err.message);
    } else {
      cb && cb();
      console.log('Email were send to', email);
    }
  });
}

exports.sendByEmail = functions.https.onCall(
  async ({email}) => {
    try {
      if (!email) {
        console.log('Empty Email');
        return;
      }

      return sendEmail(email, "Тестовый заголовок", template());
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);
