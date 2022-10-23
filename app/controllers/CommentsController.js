const Donation = require('../models/Donation');
const Comment = require('../models/Comment');

exports.ViewComments = async (req, res, next) => {
  try {
    await Comment.create({
      donationId: req.body.donationId,
      userId: req.session.user.id,
      message: req.body.message,
    });
    res.redirect(`/donation/${req.body.donationId}`);
  } catch (error) {
    next(error);
  }
};

exports.PostComments = async (req, res, next) => {
  try {
    console.log(req.params.id)
    await Comment.create({
      donationId: req.params.id,
      userId: req.session.user.id,
      message: req.body.message,
    });
    res.redirect(`/donation/${req.params.id}`);
  } catch (error) {
    console.log(error)
    next(error);
  }
};
