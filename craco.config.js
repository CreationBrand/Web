const path = require('path')
const CracoEsbuildPlugin = require('craco-esbuild')

module.exports = {
    plugins: [{ plugin: CracoEsbuildPlugin }],
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
}
