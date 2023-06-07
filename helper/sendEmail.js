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
  to: "wejidaj156@vaband.com",
  from: "men_is_doc@meta.ua",
  subject: "test email",
  html: "<p><strong>It's a test mail from GoIT school lesson</strong></p>",
};
transport
  .sendMail(email)
  .then(() => console.log("email is send"))
  .catch((error) => console.log(error.message));
