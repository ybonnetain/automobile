Feature: Login
  As a user of the application
  I should be able to authenticate
  And should be presented with appropriate error messages

@android
Scenario: Trying to authenticate without login
  Given that I start the Android application
  When I tap/click on Android element "//android.widget.TextView[@text='LOG IN']"
  Then I should see the text "login is required" in the element "Login Form Error" by accessibilityId

@ios
Scenario: Trying to authenticate without login
  Given that I start the iOS application
  When I press on iOS element "password_forgotten"
  Then I should see the text "login is required" in the element "Login Form Error" by testId