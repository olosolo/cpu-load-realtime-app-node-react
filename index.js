const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const compiler = webpack(webpackConfig);

compiler.run(function(err, stats){
    if(err) throw err
    console.log("Build completed");
})