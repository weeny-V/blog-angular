const { User } = require('../models/Users');

const getUserInfo = async (req, res, next) => {
  try {
    console.log(req.user);
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (!user || !email) {
      return res.status(400).send({
        message: 'User with such an email does not exist.',
        status: 400,
      })
    }

    return res.status(200).send({
      message: 'User sent',
      status: 200,
      user: {
        _id: user._id,
        method: user.method,
        facebookID: user.facebookID,
        name: user.name,
        surname: user.surname,
        email: user.email,
        createdDate: user.createdDate,
      },
    })
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUserInfo,
}
