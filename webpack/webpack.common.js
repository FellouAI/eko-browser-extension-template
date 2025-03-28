const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
      sidebar: path.join(srcDir, 'sidebar/index.tsx'),
      options: path.join(srcDir, 'options/index.tsx'),
      background: path.join(srcDir, 'background/index.ts'),
      content_script: path.join(srcDir, 'content/index.ts')
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
              return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "public", to: "../" },
                {
                    from: 'node_modules/@eko-ai/eko/dist/extension_content_script.js',
                    to: "../eko/extension_content_script.js"
                },
                {
                    from: 'node_modules/@eko-ai/eko/dist/extension/script',
                    to: "../eko/script"
                }
            ],
            options: {},
        })
    ],
};
