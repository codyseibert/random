request = require 'request'
parse = require 'csv-parse'
Promise = require 'bluebird'

module.exports = (TICKER) ->
  new Promise (resolve, reject) ->
    request "http://ichart.finance.yahoo.com/table.csv?s=#{TICKER}", (error, response, body) ->
      parse body, (err, obj) ->
        headers = obj[0]
        entries = []
        for i in [1...obj.length]
          entry = {}
          for header, h in headers
            entry[header] = obj[i][h]
          entry.date = new Date(entry.Date)
          entries.push entry
        entries.sort (a, b) ->
          a.date - b.date
        resolve entries
