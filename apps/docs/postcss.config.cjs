const postcssPresetEnv = require('postcss-preset-env')

const config = {
  plugins: [postcssPresetEnv({ stage: 2 })]
}

module.exports = config
