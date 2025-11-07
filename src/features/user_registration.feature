Feature: User registration

    Background:
        Given I am on the registration page

    Scenario: Registration with incorrect information
        Given an already registered user <firstname> <lastname>
        When I enter <firstname> <lastname> <email> <password> in the registration form
        Then I see an error message
        And the account is not created

Examples:
| firstname | lastname | email                                 | password   |
| John      | Doe      | admin@practicesoftwaretesting.com     | Welcome01. |
| Jane      | Doe      | customer@practicesoftwaretesting.com  | Welcome01. |
| Jack      | Howe     | customer2@practicesoftwaretesting.com | Welcome01. |
| Bob       | Smith    | customer3@practicesoftwaretesting.com | Pass123.   |

