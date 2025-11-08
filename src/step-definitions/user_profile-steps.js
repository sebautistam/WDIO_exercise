const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

Given(/^I am logged in as a registered user$/, async function() {
    await browser.url('/auth/login');
    await $('#email').setValue('customer@practicesoftwaretesting.com');
    await $('#password').setValue('welcome01');
    await $('[data-test="login-submit"]').click();
    
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('account'),
        {
            timeout: 5000,
            timeoutMsg: 'Expected to be redirected to account page within 5s'
        }
    );

    await $('[data-test="nav-profile"]').click();

    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('profile'),
        {
            timeout: 10000,
            timeoutMsg: 'Expected to be redirected to profile page within 10s'
        }
    );
        
    const country = $('[data-test="country"]');
    await country.waitUntil(
        async () => (await country.getValue()) !== '',
        {
            timeout: 10000,
            timeoutMsg: 'Expected Country to be filled out within 10s'
        }
    );
});

/***SCENARIO 1****/
When(/^I update the profile information with correct information$/, async function() {7
    await $('[data-test="postal_code"]').setValue('12345');
    await $('[data-test="update-profile-submit"]').click();
});

Then(/^I see a success message with text "([^"]*)"$/, 
    async function(expectedText) {
    const success = await $('.alert.alert-success');
    await expect(await success).toBeDisplayed();
    await expect(await success.getText()).toContain(expectedText);
});

/***SCENARIO 2****/
When(/^I try to update the password to the same password currently in use$/, 
    async function() {
    await $('[data-test="current-password"]').setValue('welcome01');
    await $('[data-test="new-password"]').setValue('welcome01');
    await $('[data-test="new-password-confirm"]').setValue('welcome01');
    await $('[data-test="change-password-submit"]').click();
});

Then(/^I see a password change error message with text "([^"]*)"$/, 
    async function(expectedText) {
    
        const error = $('.alert.alert-danger');

        await error.waitForExist({ timeout: 10000 });
        await error.waitForDisplayed({ timeout: 10000 });
        await expect(await error.getText()).toContain(expectedText);
});

