/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index', { title: 'Telegid' });
};
exports.channel_content = function (req, res) {
  res.render('partials/channel-content');
};