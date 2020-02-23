Feature: Login
  As a user of the application
  I should be able to authenticate
  And should be presented with appropriate error messages

@android
Scenario: Trying to authenticate without login
  Given that I start the app
  When I press element "//android.widget.TextView[@text='LOG IN']"
  Then I should see the text "login is required" in the element "Login Form Error" by accessibilityId

@ios
Scenario: Trying to authenticate without login
  Given that I start the app
  When I press element "password_forgotten"
  Then I should see the text "login is required" in the element "Login Form Error" by testId