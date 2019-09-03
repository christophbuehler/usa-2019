module.exports = [{
    entry: './src/main.ts',
    output: {
      filename: 'sundown.min.js',
      library: 'sundown',
      libraryExport: 'default',
    },
    resolve: {
      extensions: [".ts", ".tsx"],
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
      }],
    },
  }];
  