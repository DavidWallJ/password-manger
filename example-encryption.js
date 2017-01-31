/**
 * Created by david on 1/30/17.
 */
'use strict';

var CryptoJS = require("crypto-js");
var myMessage = {
    name: 'Foo',
    secretName: 'Bar'
};
//encrypt takes a string
//decrypt will only return a string.

var myKey = 'secret key 123';
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(myMessage), myKey );
console.log(`Encrypted message: ${ciphertext}`);
// Decrypt

// site suggested pattern
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), myKey);
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);

// tutorial suggested pattern
var bytes  = CryptoJS.AES.decrypt(ciphertext, myKey);
var plaintext = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(`Name: ${plaintext. name}`);
console.log(`Secret name: ${plaintext. secretName}`);

