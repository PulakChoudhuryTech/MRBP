var cfg = {};

cfg.port = process.env.PORT || 3000;
cfg.sendgridApiKey = process.env.SENDGRID_API_KEY;
// Export configuration object
module.exports = cfg;