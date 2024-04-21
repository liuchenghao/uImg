const webpack = require('webpack');
const {
  getH5Options
} = require('@dcloudio/uni-cli-shared');
const h5 = getH5Options("./manifest.json");
let qqMapKey = "CD5BZ-ECWCX-LPF4D-TLHMR-P4STT-LUFYU";
const sdkConfigs = h5.sdkConfigs || {};
if (
  sdkConfigs.maps &&
  sdkConfigs.maps.qqmap &&
  sdkConfigs.maps.qqmap.key
) {
  qqMapKey = sdkConfigs.maps.qqmap.key;
}
const config = {
  devServer: {
    proxy: {
      '/static': {
        target: 'https://api-remote.xxxx.com',
      }
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "__uMa": JSON.stringify({
          qqMapKey
        })
      })
    ]
  }
};
module.exports = config;
