const sgEmail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const metamailerConfig = {
  host: "smt.meta.ua",
  port: 465,
  secure: true,
  ayth: {
    user: "men_is_doc@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(metamailerConfig);

const email = {
  to: "men_is_doc@meta.ua",
  from: "men_is_doc@meta.ua",
  subject: "test email",
  html: "<p><strong>It's a test mail from GoIT school lesson</strong></p>",
};
transport
  .sendMail(email)
  .then(() => console.log("email is send"))
  .catch((error) => console.log(error.message));

// module.exports = sendMail;

// const { SEND_GRID_API_KEY } = process.env;

// sgEmail.setApiKey(SEND_GRID_API_KEY);

// const sendEmail = async (data) => {
//   const email = { ...data, from: "men_is_doc@meta.ua " };
//   await sgEmail.send(email);
//   return true;
// };
