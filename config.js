const readjson = require("./lib/utils/readjson");


var loadedConfig = {}; // loaded configs
var configPath = 'config.uploadtos3'; // default config path
const getConfigFile = (path) => {
    if (path) { configPath = path; }
    const c = readjson(configPath);
    return c;
}

module.exports = {
    getConfigFile,
    get: () => { return loadedConfig; },
    load: (inp) => {
        //load config file
        var config = getConfigFile(inp.configPath);

        //set speicific config attributes if specified in terminal 
        var attrs = config.env[config.defaults.env];
        if (inp && inp.env) { attrs = config.env[inp.env] }
        if (inp && inp.path) { attrs.path = inp.path; }
        if (inp && inp.profile) { attrs.profile = inp.profile; }
        if (inp && inp.region) { attrs.region = inp.region; }
        if (inp && inp.s3Bucket) { attrs.s3Bucket = inp.s3Bucket; }
        if (inp && inp.ignorePathsJSON) { attrs.ignore = JSON.parse(inp.ignorePathsJSON); }

        loadedConfig = attrs;
        console.log('-> Attributes Loaded: ', loadedConfig);
        return loadedConfig;
    }
}