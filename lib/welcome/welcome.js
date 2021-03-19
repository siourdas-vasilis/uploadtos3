var colors = require('colors');

let welcomeMessage = `|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|\n`.cyan;
welcomeMessage    += `|`.cyan+`       Deploy To S3`.white+ ` \\_/`.yellow+`     |\n`.cyan;
welcomeMessage    += `|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`.cyan;

module.exports = {
    welcomeMessage: console.log(welcomeMessage.bgBlack.cyan)
}