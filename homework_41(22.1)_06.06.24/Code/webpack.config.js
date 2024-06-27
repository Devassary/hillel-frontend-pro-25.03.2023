import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import {plugins} from "@babel/preset-env/lib/plugins-compat-data.js";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintPlugin from 'eslint-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, {mode}) => {
    const isProd = mode === 'production';

    return {
        mode,
        entry: resolve(__dirname, 'src', 'app.js'),
        devtool: isProd ? false : 'eval-source-map',
        devServer: {
            devMiddleware: {
                writeToDisk: true,
            },
            static: resolve(__dirname, "dist"),
            compress: true,
            port: 3000,
        },
        output: {
            path: resolve(__dirname, 'dist'),
            filename: '[name].bundle.js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,

                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,

                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    outputStyle: 'compressed'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    type: 'asset'
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new HtmlWebpackPlugin({
                title: "Homework 41(22.1)",
                scriptLoading: 'defer',
                template: resolve(__dirname, 'src', 'index.html'),
                minify: true,
                hash: true,
            }),
            new CopyPlugin({
                patterns: [
                    {from: resolve(__dirname, 'src', 'public'), to: resolve(__dirname, 'dist')},
                ],
            }),
            new ESLintPlugin({
                extensions: ['js'],
                emitWarning: true,
                emitError: true,
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                "...",
                new CssMinimizerPlugin(),
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ["gifsicle", {interlaced: true}],
                                ["jpegtran", {progressive: true}],
                                ["optipng", {optimizationLevel: 5}],
                                ["svgo",
                                    {
                                        plugins: [
                                            {
                                                name: "preset-default",
                                                params: {
                                                    overrides: {
                                                        removeViewBox: false,
                                                        addAttributesToSVGElement: {
                                                            params: {
                                                                attributes: [
                                                                    {xmlns: "http://www.w3.org/2000/svg"},
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                ],
                            ],
                        },
                    },
                }),
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                maxSize: 70000,
                minRemainingSize: 0,
                minChunks: 1,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
    }
}
