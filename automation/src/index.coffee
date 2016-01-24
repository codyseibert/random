spawn = require('child_process').spawn
Promise = require 'bluebird'

class Login
  constructor: (@username, @email, @password) ->

logins = [
  new Login "ghostrider9511", "ghostrider9511@gmail.com", "dOg#ibCud!5D"
  new Login "kigostacre", "kigostacre@thrma.com", "dOg#ibCud!5D"
  new Login "ceriputhic", "ceriputhic@thrma.com", "bad8C_dasc"
  new Login "jebuchirit", "jebuchirit@thrma.com", "bad8C_dasc"
  new Login "mupheporos", "mupheporos@thrma.com", "bad8C_dasc"
  new Login "cricracloc", "cricracloc@thrma.com", "bad8C_dasc"
  new Login "hoslehahej", "hoslehahej@thrma.com", "bad8C_dasc"
]

promises = for login in logins
  do (login) ->
    username = login.username
    password = login.password
    channel = 'http://www.twitch.tv/officialpcmasterrace'

    new Promise (resolve, reject) ->
      watch = spawn 'coffee', ['index.coffee', username, password, channel]
      watch.stdout.on 'data', (data) ->
        console.log data
      watch.stderr.on 'data', (data) ->
        console.log data
      watch.on 'close', (code) ->
        resolve()

Promise.all(promises).then ->
  console.log 'done with all'
