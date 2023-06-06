const bcrypt = require("bcrypt");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY, BASE_URL } = process.env;
const HttpError = require("../helper/HttpError");
const gravatar = require("gravatar");

const { nanoid } = require("nanoid");
const { sendEmail } = require("../helper/sendEmail");

const avatarDir = path.join("__dirname", "../", "public", "avatars");

async function resize(publicLocation) {
  const image = await Jimp.read(publicLocation);
  image.resize(250, 250).write(publicLocation);
}

// реєстрація клієнта
const register = async (body, res) => {
  const { email, password } = body;

  const currentUser = await User.findOne({ email: body.email });
  if (currentUser) {
    // throw new HttpError(409, "User alredy exist");
    return res.status(409).json({ message: "User alredy exist" });
  }
  body.password = await bcrypt.hash(body.password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({ ...body, avatarURL, verificationToken });

  const verefyEmail = {
    to: email,
    subject: "Verufy email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">
        Click verify emaail
      </a>`,
  };
  await sendEmail(verefyEmail);

  return json(newUser.email, avatarURL, verefyEmail);

  // return await User.create({ ...body, avatarURL, veryficationToken });

  //   return res.status(201).end();
};

const verefyEmail = async (body) => {
  const { verificationToken } = req.body;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(401, "Email not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: " ",
  });
  res.json("Email verify success");
};

async function login(body) {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "User not found");
  }
  if (!user.verify) {
    throw new HttpError(401, "Email is not verify");
  }

  const passwordCompara = await bcrypt.compare(body.password, user.password);
  if (!passwordCompara) {
    console.log(password, user.password);
    throw new HttpError(401, "Password incorrect");
  }
  console.log(password, user.password);
  // token
  const { _id: id } = user;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const decodeedToken = jwt.decode(token);

  try {
    const token = jwt.verify(token, SECRET_KEY);
    await User.findByIdAndUpdate(currentUser._id, { token });
  } catch (error) {}

  return { token };
}

const logout = async (body) => {
  // Пошук і видаленя токену користувача
  const { _id } = body;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout success" });
};
// const userLogout = async (req, res, next) => {
//   await logoutCurrentUser(req.user);
//   res.status(200).json({ message: "No Content" });
// };

const patchAvatar = async (req, res) => {
  // console.log(req.file, req.body);
  const { userId } = req.body;
  const { path: tempLocation, originalname } = req.file;
  const fileName = `${userId}_${originalname}`;
  const publicLocation = path.join(avatarDir, fileName);
  await fs.rename(tempLocation, publicLocation);
  resize(publicLocation);
  // const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate({ _id: userId }, { avatarURL: publicLocation });
  // res.status(200).json({ avatarURL });
  return res.status(200).json({ publicLocation });
};

module.exports = { register, login, logout, patchAvatar, verefyEmail };
