const sveltePreprocessPostcss = require('svelte-preprocess-postcss');

module.exports = {
  preprocess: {
    style: sveltePreprocessPostcss({
      configFilePath: './postcss.config.js',
      useConfigFile: true,
    })
  },
};