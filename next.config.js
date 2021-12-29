const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { withContentlayer } = require('next-contentlayer');

module.exports = withPlugins([
	[withPWA({
		pwa: {
			dest: 'public',
			runtimeCaching,
			skipWaiting: true,
		},
	})],
	[withContentlayer()]
]);
