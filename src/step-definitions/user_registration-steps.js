const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

Given('I am on the registration page', async function () {
    // Navigate to the registration page
    await browser.url('/auth/register');
});

Given(/^an already registered user (.+) (.+)$/, async function (firstname, lastname) {
    // Just store the user info for later use
});

When(/^I enter (.+) (.+) (.+) (.+) in the registration form$/, 
    async function (firstname, lastname, email, password) {
        await $('#first_name').setValue(firstname);
        await $('#last_name').setValue(lastname);

        await $('#dob').setValue('1999-01-02');
        await $('#street').setValue('123 Road Street');
        await $('#postal_code').setValue('12345');
        await $('#city').setValue('NYC');
        await $('#state').setValue('New York');
        await $('#country').selectByAttribute('value', 'US');
        await $('#phone').setValue('123456789');

        await $('#email').setValue(email);
        await $('#password').setValue(password);

        await $('button[type="submit"]').click();
    });

Then('I see an error message', async function () {
    const error = await $('[data-test="register-error"]');
    await expect(error).toBeDisplayed();
});

Then('the account is not created', async function () {
    const url = await browser.getUrl();
    await expect(url).toContain('auth/register');
});