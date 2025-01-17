const express = require("express");
const router = express.Router();
const contactControler = require("../../controlers/contact-controler");
const authRouter = require("./authRouter");
const {
  isValidId,
  authidentify,
  validateBody,
} = require("../../decorator/index");
const upload = require("../../midleWares/upload");
// const isValidId = require("../../decorator/isValidid");

// const Schema = require("../../schemas/contact-schemas");

// router.use(authidentify);
router.get("/", contactControler.getAllContacts);

router.get("/:id", isValidId, contactControler.getContactsById);

router.patch("/:id", isValidId, contactControler.updateContact);

// CHANG POST (PUT)
router.post("/auth", upload.single("avatar"), authRouter);

router.post("/", contactControler.addContact);

router.delete("/:id", isValidId, contactControler.removeContacts);

router.patch("/:id/favorite", isValidId, contactControler.updateStatusContact);

module.exports = router;
