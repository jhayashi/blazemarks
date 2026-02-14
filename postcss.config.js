const stylexPlugin = require("@stylexjs/postcss-plugin");
const babelConfig = require("./babel.config.js");

module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: [
        "components/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
        "pages/**/*.{ts,tsx}",
      ],
      babelConfig: babelConfig,
      // when `true`, Stylex can't override RNfW styles for some reason.
      useCSSLayers: false,
    },
    autoprefixer: {},
  },
};
