const Donation = require('../models/Donation');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.DonationPage = (req, res, next) => {
  console.log({
    layout: 'user_layout',
    loginPage: true,
    pageTitle: 'donation',
    type : req.query.type
  })
  if (res.locals.isAuthenticated) {
    res.render('donation', {
      layout: 'user_layout',
      loginPage: true,
      pageTitle: 'donation',
      type : req.query.type
    });
  } else {
    res.redirect('/');
  }
};

exports.PostDonation = async (req, res, next) => {
  try {
    await Donation.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image_base64,
      source_location: req.body.source_location,
      userId: req.session.user.id,
      type:req.body.type
    });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.DonationDetail = async (req, res, next) => {
  try {
    if (res.locals.isAuthenticated) {
      const donation = await Donation.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            as: 'user',
            model: User,
          },
          {
            model: Comment,
            as: 'comments',
            include: { model: User },
          },
        ],
      });
      donation.viewCount = (donation.viewCount ? donation.viewCount : 0) + 1;
      await donation.save();
      res.render('donation_detail', {
        layout: 'user_layout',
        id: req.params.id,
        donation: {
          ...donation.dataValues,
          comments: donation.comments.map((comment) => ({ ...comment.dataValues, user: comment.user.dataValues })),
          creator: donation.user.fullName,
        },
      });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
};

exports.donarForm = async (req, res, next) => {
  try {
    if (res.locals.isAuthenticated) {
      return res.render('donor_form', {
        layout: 'user_layout',
        user : res.locals.user
      });
    }
    return res.redirect('/');
  } catch (error) {
    next(error);
  }
};
