var fs = require('fs');

module.exports = function () {
    'use strict';

    var ACCOUNTS_FILE,
        accounts,
        initializeAccountsFile,
        loadAccounts,
        saveAccounts;

    ACCOUNTS_FILE = 'accounts.txt';

    initializeAccountsFile = function () {

        /*jslint stupid: true */
        if (fs.existsSync(ACCOUNTS_FILE)) {
            return;
        }
        /*jslint stupid: false */

        fs.writeFile(ACCOUNTS_FILE, JSON.stringify({}), function (err) {
            if (err) {
                console.log(err);
            }
        });
    };

    loadAccounts = function () {
        fs.readFile(ACCOUNTS_FILE, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                accounts = JSON.parse(data);
            }
        });
    };
    loadAccounts();

    saveAccounts = function () {
        fs.writeFile(ACCOUNTS_FILE, JSON.stringify(accounts), function (err) {
            if (err) {
                console.log(err);
            }
        });
    };

    this.isUsernameTaken = function (username) {
        return accounts[username] !== undefined;
    };

    this.createAccount = function (username, password) {
        accounts[username] = password;
        saveAccounts();
    };

    this.isValidLogin = function (username, password) {
        return accounts[username] === password;
    };

    initializeAccountsFile();
};
