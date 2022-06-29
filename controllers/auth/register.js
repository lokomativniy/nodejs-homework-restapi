// const { nanoid } = require("nanoid");

const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models");

const gravatar = require("gravatar");

const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`${email} in use`);
  }

  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  const newUser = new User({
    subscription,
    email,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);

  await newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждения email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
