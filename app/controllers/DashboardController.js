const User = require('../models/User');
const Donor = require('../models/Donor');

exports.approvalList = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Donor,
        where: {
          status: 'REQUESTED',
        },
      },
      where: {
        isSuperAdmin: false,
      },
    });
    return res.render('donor_approval_list', {
      layout: 'admin_layout',
      csrfToken: res.locals.csrfToken,
      users: users.map((data) => ({ ...data.dataValues })),
    });
  } catch (error) {
    next(error);
  }
};

exports.approveDonation = async (req, res, next) => {
  try {
    await Donor.update({ status: req.body.status, notes: req.body.notes }, { where: { userId: req.body.id } });
    return res.redirect('/donor_approval_list');
  } catch (error) {
    console.log(error);
    next(error);
  }
};
