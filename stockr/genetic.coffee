chromoesome = require './chromosome'
_ = require 'underscore'
require './helpers'

Genetic = class Genetic
  constructor: ->

  select: (pool) ->
    for p in pool
      if Math.random() > 0.9
        p

  crossover: (pool, num) ->
    i = 0
    for n in [0...num]
      pool[i++].crossover pool[parseInt(Math.random() * pool.length)]

  mutate: (pool) ->
    for p in pool
      if Math.random() > 0.9
        p.mutate()

  train: (Trainable, maxPopulation, numEpochs, fitnessFn) ->
    trainables = []
    for i in [0...maxPopulation]
      trainables.push new Trainable()

    score = (trainables) ->
      scores = []
      for trainable, i in trainables
        scores.push
          trainable: trainable
          score: fitnessFn trainable
      scores.sort (a, b) -> a.score - b.score
      scores.map (score) -> score.trainable

    for epoch in [0...numEpochs]
      trainables = select score(trainables)
        .concat crossover trainables, maxPopulation / 2
        .concat mutate trainables
        .splice 0, maxPopulation
      console.log trainables

module.exports = Genetic
