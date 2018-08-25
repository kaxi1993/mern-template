const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const signale = require('signale')

const webpackConfig = require('../webpack.config')
const project = require('../../project.config')

const runWebpackCompiler = config =>
    new Promise((resolve, reject) => {
        webpack(config).run((err, stats) => {
            if (err) {
                signale.fatal('Webpack compiler encountered a fatal error.', err)
                return reject(err)
            }

            const jsonStats = stats.toJson()
            if (jsonStats.errors.length > 0) {
                signale.fatal('Webpack compiler encountered errors.')
                signale.fatal(jsonStats.errors.join('\n'))

                return reject(new Error('Webpack compiler encountered errors'))
            } else if (jsonStats.warnings.length > 0) {
                signale.watch('Webpack compiler encountered warnings.')
                signale.watch(jsonStats.warnings.join('\n'))
            }
            resolve(stats)
        })
    })

const compile = () => Promise.resolve()
    .then(() => signale.pending('Starting compiler...'))
    .then(() => signale.pending('Target application environment: ' + chalk.bold(project.env)))
    .then(() => runWebpackCompiler(webpackConfig))
    .then((stats) => {
        signale.pending(`Copying static assets from ./public to ./${project.outDir}.`)
        fs.copySync(
            path.resolve(project.basePath, 'public'),
            path.resolve(project.basePath, project.outDir)
        )
        return stats
    })
    .then((stats) => {
        if (project.verbose) {
            signale.complete(stats.toString({
                colors: true,
                chunks: false,
            }))
        }
        signale.success(`Compiler finished successfully! See ./${project.outDir}.`)
    })
    .catch(err => signale.fatal('Compiler encountered errors.', err))

compile()
