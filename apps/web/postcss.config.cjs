const postcssPresetEnv = require('postcss-preset-env')

const config = {
  plugins: [
    postcssPresetEnv({
      minimumVendorImplementations: 2,
    })
  ]
}

module.exports = config
