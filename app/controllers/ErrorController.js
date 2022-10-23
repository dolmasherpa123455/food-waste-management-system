exports.pageNotFound = (req, res, next) => {
  return res.render('404', {
    layout: 'page_not_found',
    id: req.params.id,
  });
};
