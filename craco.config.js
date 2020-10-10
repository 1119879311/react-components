const cracoLess = require("craco-less")
const path = require("path")
const px2rem = require("postcss-px2rem")
const addPath = dir => path.join(__dirname,dir);

module.exports = {
    style:{
        postcss:{
            plugins:[
                // px2rem({
                //     remUnit: 37.5,
                //     exclude:/node-modules/
                // })
            ]
        }
    },
    webpack:{
        alias:{
            "@":addPath("src")
        }
    },
    babel:{
        plugins:[
            ["import",{ libraryName: 'antd', style: true }]
        ]
    },
    plugins:[
        {
            plugin: cracoLess,
            options: {
              lessLoaderOptions: {
                lessOptions: {
                  modifyVars: { '@primary-color': '#1890ff' },
                  javascriptEnabled: true,
                },
              },
            },
          },
       
    ],
    devServer:(devServerConfig, { env, paths, proxy, allowedHost }) => { return {...devServerConfig, historyApiFallback:true}; }
}