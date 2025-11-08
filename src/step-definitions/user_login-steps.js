const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

Given(/^I am on the login page with an existing account$/, async function (){
    await browser.url('/auth/login');
});

/***SCENARIO 1****/
When(/^I fill out the login form with incorrect (.+) or (.+)$/, 
    async function(email, password) {
        await $('#email').setValue(email);
        await $('#password').setValue(password);

        await $('[data-test="login-submit"]').click();

});

Then(/^I see an error message with text "([^"]*)"$/, async function(expectedText) {
    const error = await $('[data-test="login-error"]');
    await expect(error).toBeDisplayed();
    await expect(await error.getText()).toContain(expectedText);
});

Then(/^I cannot access the account$/, async function() {
    const url = await browser.getUrl();
    await expect(url).toContain('auth/login');
});

/***SCENARIO 2****/
When(/^I fill out the login form with correct (.+) and (.+)$/, 
    async function(email, password) {
        await $('#email').setValue(email);
        await $('#password').setValue(password);

        await $('[data-test="login-submit"]').click();

});

Then(/^I can access the account$/, async function() {
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('account'),
        {
            timeout: 5000,
            timeoutMsg: 'Expected to be redirected to account page within 5s'
        }
    );
});

/***SCENARIO 3****/
When(/^I try to access an existing account several times with correct (.+) and incorrect (.+)$/, 
    async function(email, password) {
        await $('#email').setValue(email);
        await $('#password').setValue(password);

        await $('[data-test="login-submit"]').click();
        await $('[data-test="login-submit"]').click();
        await $('[data-test="login-submit"]').click();
        await $('[data-test="login-submit"]').click();

});
