
$(document).ready ->

  WIDTH = $('.atom').width()
  HEIGHT = $('.atom').height()
  CENTER_X = WIDTH / 2
  CENTER_Y = HEIGHT / 2
  # $('.atom').attr 'width', WIDTH
  # $('.atom').attr 'height', HEIGHT

  makeSVG = (tag, attrs) ->
    el = document.createElementNS 'http://www.w3.org/2000/svg', tag
    for k, v of attrs
      el.setAttribute k, v
    el

  randomColor = ->
    '#'+Math.floor(Math.random() * 16777215).toString(16);

  class Particle

    constructor: (radius, size) ->
      @size = size
      @theta = Math.random() * Math.PI
      @phi = Math.random() * Math.PI * 2
      @radius = radius
      @thetaStep = Math.random() * 0.02 + 0.02
      @phiStep = Math.random() * 0.005 + 0.005
      @svg = makeSVG 'circle',
        cx: @getX()
        cy: @getY()
        r: @getR()
        fill: randomColor()

    getX: ->
      CENTER_X + @radius * Math.sin(@theta) * Math.cos(@phi)

    getY: ->
      CENTER_Y + @radius * Math.sin(@theta) * Math.sin(@phi)

    getR: ->
      Math.max(2, Math.cos(@theta) * @size + @size + 1)


  class Orbit

    constructor: (numParticles, radius, particleSize) ->
      @particles = []
      @radius = radius

      for i in [0..numParticles]
        particle = new Particle @radius, particleSize
        $('.atom').append particle.svg
        @particles.push particle

    render: ->
      for particle in @particles
        svg = particle.svg
        particle.radius = @radius
        svg.setAttribute 'cx', particle.getX()
        svg.setAttribute 'cy', particle.getY()
        svg.setAttribute 'r', particle.getR()

    update: ->
      for particle in @particles
        particle.theta += particle.thetaStep
        particle.phi += particle.phiStep

  orbits = []

  # GENERATE RINGS
  # setInterval ->
  #   rings.push new Ring()
  # , 1000
  nucleus = makeSVG 'circle',
    cx: CENTER_X
    cy: CENTER_Y
    r: 17
    fill: 'black'
    class: 'nucleus'

  orbits.push new Orbit 2, 50, 3
  orbits.push new Orbit 4, 80, 3
  orbits.push new Orbit 8, 120, 3
  orbits.push new Orbit 8, 150, 3
  # orbits.push new Orbit 10, 400, 9
  # orbits.push new Orbit 10, 500, 11

  # UPDATE
  setInterval ->
    for orbit in orbits
      orbit.update()
  , 10

  # RENDER
  setInterval ->
    for orbit in orbits
      orbit.render()

    nucleus.remove()
    particles = $('circle')
    particles.sort (a, b) ->
      parseFloat(a.getAttribute('r')) - parseFloat(b.getAttribute('r'))

    nucleusPlaced = false
    $('.atom').empty()
    for particle in particles
      $('.atom').append particle
      if not nucleusPlaced and parseFloat(particle.getAttribute('r')) > 6
        $('.atom').append nucleus
        nucleusPlaced = true
      continue
  , 10
