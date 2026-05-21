module.exports = {
  mode: 'development',
  // MV3 では unsafe-eval 不可。dev でも eval 系 devtool を使わない
  devtool: 'cheap-source-map',
  entry: {
    'main': './js/main.js',
  },
  output: {
    path: `${__dirname}/dist/build`,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options:{
                "presets": ["@babel/preset-env","@babel/preset-react"]

            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};

