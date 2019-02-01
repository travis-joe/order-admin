
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: true,
      title: 'order-admin',
      dll: true,
      routes: {
        exclude: [
          /components\//,
          /service/,
          /models/
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  }
}
