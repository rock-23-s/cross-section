import { defineConfig } from '@umijs/max';
import routes from './src/route'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '',
  },
  lessLoader: {
    modifyVars: {
      hack: `true;
        @import "~@/styles/attribute.less";
       `,
    },
  },
  routes,
  npmClient: 'yarn',
  hash: true,
  // 打包输出路径
  outputPath: 'release/app/dist/renderer',
  chainWebpack(memo) {
    // memo.module
    //   .rule('svgo')
    //   .test(/\.svg$/)
    //   .use('svgo-loader')
    //   .loader(require.resolve('svgo-loader'));
    
    // memo.module
    // .rule('svg-sprite')
    // .test(/\.svg$/)
    // .use('svg-sprite-loader')
    // .loader(require.resolve('svg-sprite-loader'))
  }
});

