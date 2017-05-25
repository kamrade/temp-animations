const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./config/webpack.base.js');

// ++++++++++++++++++++++++++++++++++++++++++++

function buildConfig(env) {
    let filename = `webpack.${env || ''}`;
    let configPath = `./config/${filename}.js`;
    let pathExists = fs.existsSync(configPath);

    if (!pathExists) {
        console.log(`Using config by path "${path.join(__dirname, './config/webpack.base.js')}"\n\n`);
        return baseConfig;
    }

    console.log(`Using config by path "${path.join(__dirname, configPath)}"\n\n`);
    return merge(baseConfig, require(configPath)(env));
}

// ++++++++++++++++++++++++++++++++++++++++++++
module.exports = buildConfig(process.env.npm_config_env);
