const path = require("path");

module.exports = ({ config }) => {
  const rules = [
    {//ES6、JSX处理
        test: /\.(ts|tsx)$/,
        loader:'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            [
              "import",
              {libraryName: "antd", style: 'css'}
            ] //antd按需加载
          ]
        }
  }, {
    test: /\.(ts|tsx)$/,
    loaders: ['awesome-typescript-loader', 'react-docgen-typescript-loader'],
    include: path.resolve(__dirname, '../'),
    exclude: /node_modules/,
  }, {
    test: /\.scss$/,
    use: [
        "style-loader", // 将 JS 字符串生成为 style 节点
        "css-loader", // 将 CSS 转化成 CommonJS 模块
        "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
    ]
  } 
];
  config.module.rules = config.module.rules.concat(rules);
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};