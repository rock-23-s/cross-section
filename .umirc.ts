import { defineConfig } from '@umijs/max';
import routes from './src/route'
import path from 'path';
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
  // 修改title
  title:'cross-section',
  // 修改icon
  links: [
    // href的图片你可以放在public里面，直接./图片名.png 就可以了，也可以是cdn链接
    { rel: 'icon', href: './public/logo.svg' },
  ],
  // 打包输出路径
  outputPath: 'release/app/dist/renderer',
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no'
  },
  ],
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

