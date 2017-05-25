// Helper: root() is defined at the bottom
const path = require('path');
const webpack = require('webpack');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// путь для подключаемых модулей в sass
const libraryPaths = ['node_modules/bootstrap/scss'];

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
let isTestWatch = (ENV === 'test-watch');
let isTest = (ENV === 'test' || isTestWatch);
let isProd = (ENV === 'build');

const extractSass = new ExtractTextPlugin({
    filename: "./style/[name].css",
    disable: ENV === "development"
});

module.exports = function makeWebpackConfig() {

    let config = {};

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isProd) {
        config.devtool = false;
    }
    else if (isTest) {
        config.devtool = 'cheap-inline-module-source-map';
    }
    else {
        config.devtool = 'cheap-inline-module-source-map';
        // config.devtool = 'eval-source-map';
    }

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */

    config.entry = isTest ? {} : {
            'polyfills': root('src/www/polyfills.ts'),
            'vendor': root('src/www/vendor.ts'),
            'app': root('src/www/main.ts') // our angular app
        };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = isTest ? {} : {
            path: root('target/dist'),
            filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
            chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
        };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html', '.jade', '.pug'],
    };

    let atlOptions = '';
    if (isTest && !isTestWatch) {
        // awesome-typescript-loader needs to output inlineSourceMap for code coverage to work with source maps.
        atlOptions = 'inlineSourceMap=true&sourceMap=false';
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        rules: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader?' + atlOptions, 'angular2-template-loader', '@angularclass/hmr-loader'],
                exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },

            // copy those assets to output
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[hash].[ext]&publicPath=../'
            },

            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            // Support for CSS as raw text
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.css$/,
                exclude: root('src/www', 'app'),
                loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader']})
            },
            // all css required in src/app files will be merged in js files
            {
                test: /\.css$/,
                include: root('src/www', 'app'),
                loader: 'raw-loader!postcss-loader'
            },

            // support for .scss files
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file

            // {
            //     test: /\.(scss|sass)$/,
            //     exclude: root('src/www', 'app'),
            //     loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader', 'sass-loader']})
            // },

            {
                test: /\.(scss|sass)$/,
                exclude: root('src/www', 'app'),
                loader: isTest ? 'null-loader' : extractSass.extract({
                    loader: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: libraryPaths
                        }
                    }],
                    fallbackLoader: "style-loader"
                })
            },
/*
            {
                test: /\.(scss|sass)$/,
                exclude: root('src/www', 'app'),
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["lib/cardpay-css-library/styles"]
                    }
                }]
            },
*/

            {
                test: /\.(scss|sass)$/,
                exclude: root('src/www', 'style'),
                use: [{
                    loader: 'raw-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        includePaths: libraryPaths
                    }
                }]
            },
/*
            // all css required in src/app files will be merged in js files
            {
                test: /\.(scss|sass)$/,
                exclude: root('src/www', 'style'),
                loader: 'raw-loader!postcss-loader!sass-loader'
            },
*/

            // support for .html as raw text
            // todo: change the loader to something that adds a hash to images
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: root('src/www', 'public')
            },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-html-loader'
            },
            { test: /\.xml$/, loader: 'xml-loader' }
        ]
    };

    if (isTest && !isTestWatch) {
        // instrument only testing sources with Istanbul, covers ts files
        config.module.rules.push({
            test: /\.ts$/,
            enforce: 'post',
            include: path.resolve('src'),
            loader: 'istanbul-instrumenter-loader',
            exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
        });
    }

    if (!isTest || !isTestWatch) {
        // tslint support
        config.module.rules.push({
            test: /\.ts$/,
            enforce: 'pre',
            loader: 'tslint-loader'
        });
    }

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        }),

        extractSass,

        // Workaround needed for angular 2 angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('src/www') // location of your src
        ),

        // Tslint configuration for webpack 2
        new webpack.LoaderOptionsPlugin({
            options: {
                /**
                 * Apply the tslint loader as pre/postLoader
                 * Reference: https://github.com/wbuchwalter/tslint-loader
                 */
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                },
                /**
                 * Sass
                 * Reference: https://github.com/jtangelder/sass-loader
                 * Transforms .scss files to .css
                 */
                sassLoader: {
                    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
                },
                /**
                 * PostCSS
                 * Reference: https://github.com/postcss/autoprefixer-core
                 * Add vendor prefixes to your css
                 */
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        })
    ];

    if (!isTest && !isTestWatch) {
        config.plugins.push(
            // Generate common chunks if necessary
            // Reference: https://webpack.github.io/docs/code-splitting.html
            // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
            new CommonsChunkPlugin({
                name: ['vendor', 'polyfills']
            }),

            // Inject script and link tags into html files
            // Reference: https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                template: root('src/www/public/index.html'),
                chunksSortMode: 'dependency'
            }),

            // Extract css files
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Disabled when in test mode or not in build mode
            new ExtractTextPlugin({filename: 'css/[name].[hash].css', disable: !isProd})
        );
    }

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: { discardComments: { removeAll: true } }
            }),
            // // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // // Dedupe modules in the output
            // new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: root('src/www/public')
            }])
        );
    }


    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: root('src/www/public'),
        historyApiFallback: true,
        quiet: true,
        stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
    };

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join(__dirname, '..', ...args);
}
