#!/usr/bin/env node

const { program } = require('commander');
var colors = require('colors');

// Setup CLI
program
    .version(" version: " + require('./package.json').version.cyan, '-v')
    .name('uploadtos3')
    .description(require('./lib/welcome/welcome').welcomeMessage);

// Upload Command
program.command('upload')
    .description("Upload your FrontEnd files to the S3 bucket")
    .option('-e, --env <env>', 'Specify environment that will be used from `config.js` file. ', 'dev')
    .option('-p, --path <path>', 'Specify path of the folder that will be uploaded. ')
    .option('-pr, --profile <profile>', 'Specify AWS profile ')
    .option('-s3, --s3-bucket <bucket>', 'Specify the S3 bucket')
    .option('-ig, --ignore <ignorePathsJSON>', 'Ignore paths or file for the upload procedure (JSON format)')
    .option('-c, --config <configPath>', 'Specify the config file of the project', 'config.uploadtos3')
    .action(async (inp) => {

        const app = require('./index.js');
        app.config.load(inp);
        await app.run().catch(err => console.error(err));
    })

program.command('check')
    .description("Show config file.  \n(this command is a tool to check if the config file is found and parsed successfully.)")
    .option('-c, --config <configPath>', 'Specify your config file', 'config.uploadtos3')
    .action(async (inp) => {
        try {
            const configFile = require('./config').getConfigFile();
            console.log('\n >'.cyan + ' Config File Found: \n .................... \n', configFile);
        } catch (err) {
            console.log(`:: ERROR :: `.red, colors.yellow(err));
        }
    })


program.parse(process.argv);

