const postcssPresetEnv = require('postcss-preset-env')

const config = {
  plugins: [
    postcssPresetEnv({
      minimumVendorImplementations: 2,
      features: {
        'custom-media-queries': true
      }
    })
  ]
}

module.exports = config
