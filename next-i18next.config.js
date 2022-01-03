const path = require('path');

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ru', 'ukr', 'es'],
	},
	localePath: path.resolve('./locales'),
};
