irc = require 'irc'

username = process.argv[2]
password = process.argv[3]
channel = process.argv[4]

server = 'irc.twitch.tv'

console.log "Starting bot #{username} to watch #{channel}"

sentences = [
  "Lov'n it"
  "I love your music"
  "Sick beats"
  "Rad man"
  "That drop was sick"
]

client = new irc.Client server, username,
  password: password
  userName: username
  nick: username

setInterval ->
  client.say "##{channel}", sentences[parseInt(Math.random() * sentences.length)]
, 30000

client.addListener "message", (from, to, text, message) ->
  console.log "#{from} => #{text}"

setTimeout ->
  process.exit 0
, 2 * 60 * 1000
