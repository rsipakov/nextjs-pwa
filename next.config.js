const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { withContentlayer } = require('next-contentlayer');
const { i18n } = require('./next-i18next.config');

module.exports = withPlugins([
	[withPWA({
		pwa: {
			dest: 'public',
			runtimeCaching,
			skipWaiting: true,
		},
		i18n,
		images: {
			domains: [
				'i.scdn.co', // Spotify Album Art
				'pbs.twimg.com' // Twitter Profile Picture
			]
		},
	})],
	[withContentlayer()]
]);
