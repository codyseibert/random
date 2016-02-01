require './helpers'

Chromosome = class Chromosome
  constructor: (@data) ->

  asString: ->
    s = ''
    i = 0
    while i < data.length
      s += toBinary(@data[i])
      i++
    s

  fromString: (string) ->
    i = 0
    while i < string.length / 32
      front = string.substring(0, 32)
      string = string.substring(32)
      @data[i] = toInt(front)
      i++
    return

  crossWith: (chromosome) ->
    chromeAString = @asString()
    chromeBString = chromosome.asString()
    ri = parseInt(Math.random() * chromeAString.length)
    front = chromeAString.substring(0, ri)
    end = chromeBString.substring(ri)
    baby = new Array(chromosome.data.length)
    c = new Chromosome(baby)
    c.fromString front + end
    c

  mutate: ->
    return

module.exports = Chromosome
