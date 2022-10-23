const { Op } = require('sequelize');
const Donation = require('../models/Donation');
const Donor = require('../models/Donor');
const User = require('../models/User');
const sequelize = require('../../config/database');
exports.homePage = async (req, res, next) => {
  console.log(req.locals);
  if (res.locals && res.locals.user && res.locals.user.isSuperAdmin) {
    return res.redirect('/admin');
  }
  const donationList = await Donation.findAll({
    limit: 4,
    where : {
      type : "donation_post"
    },
    order: [['viewCount', 'DESC']]
  });


  const [topDonors] = await sequelize.query(`select users."fullName" , count(donations."userId") as count from users
  inner join donors on donors."userId" = users.id and  donors."status" = 'APPROVED'
  left join donations on donations."userId" = users.id
  where donations."type" = 'donation_post'
  group by users."fullName" , donations."userId"
  order by count desc  limit 10 
  `)

  console.log(topDonors)

  const featureList = donationList.map((feat) => {
    return {
      ...feat.dataValues,
      description: feat.description.substring(0, 50),
      detailLink: 'donation/' + feat.dataValues.id,
      image: feat.dataValues.image
        ? feat.dataValues.image
        : 'https://images.unsplash.com/photo-1531928351158-2f736078e0a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    };
  });
  return res.render('home', { layout: 'user_layout', featureList , topDonors });
};

exports.adminPage = async (req, res, next) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const TODAY_END = new Date().setHours(23, 59, 59, 999);
  const userTotalCount = await User.count();
  const donationTotalCount = await Donation.count({});
  const donorTotalCount = await Donor.count({
    where: {
      status: 'APPROVED',
    },
  });

  const userTodayTotalCount = await User.count({
    where: {
      createdAt: {
        [Op.gt]: TODAY_START,
        [Op.lt]: TODAY_END,
      },
    },
  });
  const donationTodayTotalCount = await Donation.count({
    where: {
      createdAt: {
        [Op.gt]: TODAY_START,
        [Op.lt]: TODAY_END,
      },
    },
  });
  const donorTodayTotalCount = await Donor.count({
    where: {
      status: 'APPROVED',
      createdAt: {
        [Op.gt]: TODAY_START,
        [Op.lt]: TODAY_END,
      },
    },
  });

  console.log(res.locals && res.locals.user && res.locals.user.isSuperAdmin);
  if (res.locals && res.locals.user && res.locals.user.isSuperAdmin) {
    return res.render('dashboard', {
      layout: 'admin_layout',
      data: { userTotalCount, donationTotalCount, donorTotalCount, userTodayTotalCount, donationTodayTotalCount, donorTodayTotalCount },
    });
  }
  return res.redirect('/');
};

exports.aboutPage = async (req, res, next) => {
  res.render('about', {
    layout: 'user_layout',
  });
};

exports.contactPage = async (req, res, next) => {
  res.render('contact_us', {
    layout: 'user_layout',
  });
};

exports.allPosts = async (req, res, next) => {
  res.render('all_posts', {
    layout: 'user_layout',
  });
};
