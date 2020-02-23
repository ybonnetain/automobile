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
Scenario: Trying to authenticate without login
  Given that I start the app
  When I press element "password_forgotten"
  Then I should have "login is required" in element "Login Form Error"