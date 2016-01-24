selenium = require 'selenium-webdriver'
By = selenium.By

USERNAME = process.argv[2]
PASSWORD = process.argv[3]
CHANNEL = process.argv[4]

TIME = 5*60*1000

console.log "Starting driver for channel #{CHANNEL} using username: #{USERNAME}, password: #{PASSWORD}"

driver = new selenium.Builder()
  .withCapabilities(selenium.Capabilities.chrome())
  .build()
driver.getWindowHandle()

driver.manage().window().setSize 1200, 700

driver.get CHANNEL
  .then ->
    driver.sleep 5000
  .then ->
    driver.findElement By.css '#header_login'
  .then (element) ->
    element.click()
  .then ->
    driver.sleep 5000
  .then ->
    driver.getWindowHandle()
  .then (handle) ->
    driver.sleep 5000
  .then ->
    driver.switchTo().frame 0
  .then ->
    driver.sleep 5000
  .then ->
    driver.findElement By.css 'input[name=username]'
  .then (username) ->
    username.sendKeys USERNAME
  .then ->
    driver.findElement By.css 'input[name=password]'
  .then (password) ->
    password.sendKeys PASSWORD
  .then ->
    driver.findElement By.css 'input[type=submit]'
  .then (submit) ->
    submit.click()
  .then ->
    driver.sleep 5000
  .then ->
    driver.switchTo().defaultContent()
  .then ->
    driver.sleep TIME
  .then ->
    driver.quit()
