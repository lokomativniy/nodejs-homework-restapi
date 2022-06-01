const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");

const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(contacts.getAll));

router.get("/:id", ctrlWrapper(contacts.getById));

router.post("/", validation(joiSchema), ctrlWrapper(contacts.add));

router.delete("/:id", ctrlWrapper(contacts.removeById));

router.put("/:id", validation(joiSchema), ctrlWrapper(contacts.updateById));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(contacts.updateFavorite)
);

module.exports = router;
