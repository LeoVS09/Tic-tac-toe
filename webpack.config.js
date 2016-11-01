const common = {
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
};


module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + "/public/build/",
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel?presets[]=es2015",
                exclude: [/node_modules/, /public/],
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
};