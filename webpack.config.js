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

  // {
  //   entry: './node_modules/airtable/build/airtable.browser.js',
  //   output: {
  //     filename: 'airtable.browser.js',
  //     libraryTarget: 'umd',
  //     library: 'Airtable',
  //   },
  // }
  