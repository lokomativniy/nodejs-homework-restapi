const { User } = require("../../models");

const gravatar = require("gravatar");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`${email} in use`);
  }

  const avatarURL = gravatar.url(email);

  const newUser = new User({ subscription, email, avatarURL });

  newUser.setPassword(password);

  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
