Feature: Login
  As a user of the application
  I should be able to authenticate
  And should be presented with appropriate error messages

@android
Scenario: Trying to authenticate without login
  Given that I start the app
  When I press element "//android.widget.TextView[@text='LOG IN']"
  Then I should have "login is required" in element "Login Form Error"

@ios
Scenario: Trying to authenticate with wrong password
  Given that I start the app
  When I fill element "email" with "test@email.com"
  When I fill element "password" with "kopasswd"
  When I press element "buttonLogin"
  Then I should have alert "Error\nPassword or email is invalid"

# @ios
# Scenario: Trying to authenticate without login
#   Given that I start the app
#   When I press element "password_forgotten"
#   Then I should have "login is required" in element "Login Form Error"