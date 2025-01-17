const express = require("express");
const avatar = require("../../midleWares/upload");

const router = express.Router();
const {
  createUserValidasionSchema,
  loginValidationSchema,
  emailShema,
} = require("../../utils/index");
const { singup, userLogin } = require("../../controlers/authControler");

const {
  logout,
  patchAvatar,
  verefyEmail,
  recentVerifiEmail,
} = require("../../servises/authServices");

const authidentify = require("../../decorator/authidentify");
const validateBody = require("../../decorator/validateBody");
const upload = require("../../midleWares/upload");
const { Schema } = require("@nestjs/mongoose");

const jsonParser = express.json();
// router.use(authidentify);

router.post(
  "/singup",
  jsonParser,
  validateBody(createUserValidasionSchema),
  singup
);
router.get("/verify/:verificationToken", verefyEmail);
router.post("/verify", recentVerifiEmail);
// Schema.emailShema,

router.patch("/avatar", upload.single("avatar"), patchAvatar);

router.post(
  "/login",
  validateBody(loginValidationSchema),
  authidentify,
  userLogin
);
router.post("/logout", authidentify, logout);

module.exports = router;
