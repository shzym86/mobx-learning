const path = require("path")

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          // 两个 preset，一个用于支持更新的 ES 语法，一个用于支持 react 语法
          presets: ["@babel/preset-env", "@babel/preset-react"],
          // 两个插件，一个用于支持装饰器语法，一个用于支持在 Class 中直接定义属性（不通过 constructor）
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }]
          ]
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist/"),
    port: 9000
  },
  resolve: {
    // import 模块文件时，不需要指定的后缀
    extensions: ['.js', '.jsx', '.json'],
  },
}