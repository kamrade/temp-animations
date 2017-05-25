
module.exports = function() {
    return {
        devServer: {
            proxy: {
                '/apps': {
                    target: 'https://waf-dev-vld.localdomain',
                    secure: false,
                    logLevel: 'debug',
                    pathRewrite: {
                        '^/apps': '/apps'
                    }
                }
            }
        }
    };
};
