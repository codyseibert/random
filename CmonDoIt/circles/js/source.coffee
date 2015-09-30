$(document).ready ->

  WIDTH = $(document).width()
  HEIGHT = $(document).height()
  CENTER_X = WIDTH / 2
  CENTER_Y = HEIGHT / 2
  $('svg').attr 'width', WIDTH
  $('svg').attr 'height', HEIGHT

  makeSVG = (tag, attrs) ->
    el = document.createElementNS 'http://www.w3.org/2000/svg', tag
    for k, v of attrs
      el.setAttribute k, v
    el

  randomColor = ->
    '#'+Math.floor(Math.random()*16777215).toString(16);

  class Circle
    RADIUS = 5

    constructor: (theta, radius) ->
      @theta = theta
      @radius = radius
      @svg = makeSVG 'circle',
        cx: @getX()
        cy: @getY()
        r: @getR()
        stroke: 'black'
        'stroke-width': 3
        fill: randomColor()

    getX: ->
      CENTER_X + @radius * Math.cos @theta

    getY: ->
      CENTER_Y + @radius * Math.sin @theta

    getR: ->
      scale = @radius / 1000#((1000 - @radius) / 1000)
      RADIUS * RADIUS * scale


  class Ring
    NUM_CIRCLES = 100
    SPEED = 10
    RADIUS = 1000
    STEP = Math.PI * 2 / NUM_CIRCLES

    constructor: ->
      @circles = []
      @radius = RADIUS

      theta = 0
      for i in [0..NUM_CIRCLES]
        theta += STEP
        circle = new Circle theta, RADIUS
        $('svg').append circle.svg
        @circles.push circle

    render: ->
      for circle in @circles
        svg = circle.svg
        circle.radius = @radius
        svg.setAttribute 'cx', circle.getX()
        svg.setAttribute 'cy', circle.getY()
        svg.setAttribute 'r', circle.getR()

    update: ->
      @radius -= SPEED
      if @radius <= 0
        for circle in @circles
          circle.svg.remove()

  rings = []

  # GENERATE RINGS
  setInterval ->
    rings.push new Ring()
  , 100

  # UPDATE
  setInterval ->
    dead = []
    for ring, index in rings
      ring.update()
      if ring.radius <= 0
        dead.push index

    for index in dead
      rings.splice index, 1
  , 10

  # RENDER
  setInterval ->
    for ring in rings
      ring.render()
  , 10

  setInterval ->
    console.log rings.length
  , 5000
