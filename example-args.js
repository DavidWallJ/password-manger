/**
 * Created by david on 1/26/17.
 */
'use strict';

var argv = require('yargs')
    .command('hello', 'Uhh it says hello', function(yargs){
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                desc: "This is for your first name.",
                type: 'string'
            },
            lastName: {
                demand: true,
                alias: 'l',
                desc: "This is for your last name.",
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;
var commandLocation = argv._[0];

console.log(argv);

if (commandLocation === 'hello' && typeof argv.name !== 'undefined' && typeof argv.lastName !== 'undefined') {
    console.log(`Hello ${argv.name} ${argv.lastName}!`);
} else if (commandLocation === 'hello' && typeof argv.name !== 'undefined') {
    console.log(`Hello ${argv.name}!`);
} else if (commandLocation === 'hello') {
    console.log('Hey guy!');
}