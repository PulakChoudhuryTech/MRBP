var cfg = {};

cfg.port = process.env.PORT || 3000;
// cfg.sendgridApiKey = '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';
cfg.sendgridApiKey = process.env.SENDGRID_API_KEY;
cfg.externalEmployeeListUri = "http://ofmc.objectfrontier.com/sites/all/themes/ofmc/contacts.php";
// Export configuration object
module.exports = cfg;