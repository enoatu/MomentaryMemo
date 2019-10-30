module.exports = {
  mode: 'development',
  entry: './js/option.js',
  entry: {
    'option': './js/option.js',
    'main': './js/main.js',
  },
  watch: true,
  output: {
    path: `${__dirname}/build`,
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

