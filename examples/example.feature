Feature: 0_Example
  As a user of the application
  I should be presented with invalid username / password error message
  When giving invalid username / password

@ios
Scenario: Trying to authenticate with wrong password
  Given that I have completed previous step
  When I fill element "email" with "test@email.com"
  When I fill element "password" with "kopasswd"
  When I press element "button_login"
  When I wait for 5000 ms
  Then I should have alert "Password or email is invalid"
  When I capture screen as "auth_screen.screenshot.png"
  Then It should match reference capture "auth_screen.screenshot.png"

@android
Scenario: Trying to authenticate with wrong password
  Given that I have completed previous step
  When I fill element "email" with "test@email.com"
  When I fill element "password" with "kopasswd"
  When I press element "button_login"
  When I wait for 5000 ms
  Then I should have alert "Password or email is invalid"
  When I capture screen as "auth_screen.screenshot.png"
  Then It should match reference capture "auth_screen.screenshot.png"
