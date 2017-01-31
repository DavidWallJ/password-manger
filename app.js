/**
 * Created by david on 1/26/17.
 */
"use strict";
var CryptoJS = require("crypto-js");

var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
    .command('create', 'Create and account', function(yargs){
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                desc: "This is for your account name",
                type: 'string'
            },
            userName: {
                demand: true,
                alias: 'l',
                desc: "This is for your username.",
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                desc: "This is for your password",
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                desc: "This is for the master password",
                type: 'string'
            }
        }).help('help');
    })
    .command('get', 'Create and account', function(yargs){
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                desc: "This is for your account name",
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                desc: "This is for the master password",
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;


// you actually have to have something in storage to get started.  I guess I could have just made an empty string

function getAccounts(masterPassword) {
    // fetch accounts
    var encryptedAccounts = storage.getItemSync('accounts');
    var accounts = [];
    // decrypt
    if (typeof encryptedAccounts !== 'undefined') {
        var bytes  = CryptoJS.AES.decrypt(encryptedAccounts, masterPassword);
        accounts = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    // return accounts array
    return accounts;
}

function saveAccounts(accounts, masterPassword) {

    var encryptedAccounts = CryptoJS.AES.encrypt(JSON.stringify(accounts), masterPassword);
    storage.setItemSync('accounts', encryptedAccounts.toString());
    return encryptedAccounts;
}

function createAccount(account, masterPassword) {

    var accounts = getAccounts(masterPassword);

    accounts.push(account);

    // now use saveAccounts function instead of setItenSync
    saveAccounts(accounts, masterPassword);
    return account;
}

// createAccount({
//     name: 'Foo.Inc',
//     userName: 'Mr.Bar',
//     password: 'bar1234'
// });

function getAccount(accountName, masterPassword){

    var accounts = getAccounts(masterPassword);
    var matchedAccount;

    accounts.forEach(function (account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    });

    return matchedAccount;
}

var commandLocation = argv._[0];

// console.log(argv);

if (commandLocation === 'create'){
    try {
        var createdAccount = createAccount({
            name: argv.name,
            userName: argv.userName,
            password: argv.password
        }, argv.masterPassword);
        console.log('Account created!');
        console.log(createdAccount);
    } catch (e) {
        console.log("Unable to create account :/");
    }
} else if (commandLocation === 'get'){
    try {
        var fetchedAccount = getAccount(argv.name, argv.masterPassword);
        console.log(fetchedAccount);
        if (typeof fetchedAccount === 'undefined') {
            console.log('Account not found :/');
        } else {
            console.log('Account found :)');
            console.log(fetchedAccount);
        }
    } catch (e) {
        console.log("Unable to get account :/")
    }
}
// if command




// var fooInc = getAccount('Foo.Inc');
// console.log(fooInc);