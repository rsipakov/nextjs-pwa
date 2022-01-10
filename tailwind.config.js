const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./pages/**/*.tsx", "./components/**/*.tsx", "./layouts/**/*.tsx", "./lib/**/*.ts"],
	darkMode: 'class',
	plugins: [
		require('tailwindcss-safe-area'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		// firefox variant
		plugin(function ({ addVariant, e, postcss }) {
			addVariant("firefox", ({ container, separator }) => {
				const isFirefoxRule = postcss.atRule({
					name: "-moz-document",
					params: "url-prefix()",
				});
				isFirefoxRule.append(container.nodes);
				container.append(isFirefoxRule);
				isFirefoxRule.walkRules((rule) => {
					rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`;
				});
			});
		}),
	],
}
