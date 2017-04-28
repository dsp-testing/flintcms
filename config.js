/*
 Welcome to FlintCMS!

  / _| (_)_ __ | |_
 | |_| | | '_ \| __|
 |  _| | | | | | |_
 |_| |_|_|_| |_|\__|

 This is the Flint configuration file. To see all of the options and settings
 available to you, visit the Flint docs at https://flintcms.com/docs.

 This intentionally a separate file from `.env`, which should contain
 sensitive information like database passwords.
============================================================================== */

module.exports = {
  siteName: 'Generic Example Title',
  siteUrl: 'http://example.com',
  debugMode: true,
  scssEntryPoint: 'scss/main.scss',
  siteLogo: '/public/assets/default_user.png',
};

