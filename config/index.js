const path = require('path')

import { defineConfig } from '@tarojs/cli'

import devConfig from './dev'
import prodConfig from './prod'

// NOTE 在 sass 中通过别名（@ 或 ~）引用需要指定路径
const sassImporter = function (url) {
  if (url[0] === "~" && url[1] !== "/") {
    return {
      file: path.resolve(__dirname, "..", "node_modules", url.substr(1))
    }
  }

  const reg = /^@styles\/(.*)/;
  return {
    file: reg.test(url)
      ? path.resolve(__dirname, "..", "src/styles", url.match(reg)[1])
      : url
  }
}

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'library',
    date: '2024-8-1',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    sass: {
      importer: sassImporter
    },
    defineConstants: {
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
      "@actions": path.resolve(__dirname, "..", "src/actions"),
      "@assets": path.resolve(__dirname, "..", "src/assets"),
      "@components": path.resolve(__dirname, "..", "src/components"),
      "@constants": path.resolve(__dirname, "..", "src/constants"),
      "@reducers": path.resolve(__dirname, "..", "src/reducers"),
      "@styles": path.resolve(__dirname, "..", "src/styles"),
      "@store": path.resolve(__dirname, "..", "src/store"),
      "@utils": path.resolve(__dirname, "..", "src/utils")
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      esnextModules: ['taro-ui'],
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        },
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
