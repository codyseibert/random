$(document).ready ->

  WIDTH = $(document).width()
  HEIGHT = $(document).height()
  MAX_DIST = 50
  RANDOM = 40
  SPACING = 50
  NODES = 30

  nodes = []
  links = []
  isWindBlowing = false
  WIND_SPEED = 0.5

  randomColor = ->
    '#'+Math.floor(Math.random()*16777215).toString(16);

  getId = ->
    nodes.length

  createRope = (sx, sy, segments, length) ->
      x = sx
      y = sy
      step = length / segments
      for i in [0..segments]
        node =
          x: x + Math.random() * RANDOM - RANDOM / 2
          y: y
          vy: 0
          fill: randomColor()
        y += step

        id = getId()

        if i > 0
          links.push
            source: id - 1
            target: id
            stroke: randomColor()
        else
          node.fixed = true

        nodes.push node

  for i in [0..40]
    createRope -200 + i * SPACING, -200, NODES, 1

  # nodes = ropes[0].nodes
  # links = ropes[0].links

  svg = d3.select('body')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)

  $(window).on 'resize', ->
    svg.attr 'width', $(document).width()
    svg.attr 'height', $(document).height()

  link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')

  node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')

  getLinks = (index) ->
    ls = []
    for li, i in links
      if li.target is index
        if ls.indexOf li.target is -1
          ls.push li

      if li.source is index
        if ls.indexOf li.source is -1
          ls.push li
    ls

  calcDistance = (s, t) ->
    dx = s.x - t.x
    dx *= dx
    dy = s.y - t.y
    dy *= dy
    Math.sqrt dx + dy

  isLinkAtMax = (index) ->
    ls = getLinks index

    apply = true
    for l in ls
      dist = calcDistance(nodes[l.source], nodes[l.target])
      if dist > MAX_DIST
        apply = false

    return apply

  applyGravity = (index) ->
    if nodes[index].fixed
      return

    G = 0.2

    if isLinkAtMax index
      nodes[index].vy += G
      nodes[index].y += nodes[index].vy
    else
      nodes[index].vy = 0

  # applyWind = (index) ->
  #   if nodes[index].fixed
  #     return
  #
  #   if isLinkAtMax index
  #     nodes[index].x += WIND_SPEED

  update = ->
    for n, index in nodes
      applyGravity index
      # applyWind index

  render = ->
    node
      .attr('cx', (d) -> d.x)
      .attr('cy', (d) -> d.y)
      .attr('r', (d) -> 5)
      .style('fill', (d) -> randomColor())

    link
      .attr('x1', (d) -> nodes[d.source].x)
      .attr('y1', (d) -> nodes[d.source].y)
      .attr('x2', (d) -> nodes[d.target].x)
      .attr('y2', (d) -> nodes[d.target].y)
      .style('stroke', (d) -> d.stroke)

  setInterval ->
    update()
  , 1

  window.requestAnimationFrame = do ->
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    (callback) ->
      setTimeout(render, 1000 / 60)

  (recursiveAnim = () ->
    render()
    requestAnimationFrame recursiveAnim
  )()
