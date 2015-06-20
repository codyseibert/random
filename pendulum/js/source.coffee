$(document).ready ->

  WIDTH = $(document).width()
  HEIGHT = $(document).height()

  randomColor = ->
    '#'+Math.floor(Math.random()*16777215).toString(16);

  svg = d3.select('body')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)

  $(window).on 'resize', ->
    svg.attr 'width', $(document).width()
    svg.attr 'height', $(document).height()

  MAX_DIST = 100

  nodes = [
    x: WIDTH / 2
    y: 200
    fx: 0
    fy: 0
    vx: 0
    vy: 0
    fixed: true
    fill: 'white'
  ,
    x: WIDTH / 2 + 40
    y: 250
    fx: 0
    fy: 0
    vx: 0
    vy: 0
    fill: 'red'
  ]

  links = [
    source: 0
    target: 1
  ]

  node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')

  link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')

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

  isLinkFullyExtended = (index) ->
    ls = getLinks index
    apply = false
    for l in ls
      dist = calcDistance(nodes[l.source], nodes[l.target])
      if dist > MAX_DIST
        apply = true
    apply

  calcTheta = (index1, index2) ->
    node1 = nodes[index1]
    node2 = nodes[index2]
    Math.atan2 node2.y - node1.y, node2.x - node1.x

  clearForces = (index) ->
    nodes[index].fx = 0
    nodes[index].fy = 0

  G = 0.2
  applyGravity = (index) ->
    nodes[index].fy += G

  applyTension = (index) ->
    cur = nodes[index]
    if not isLinkFullyExtended index
      return
    # debugger
    ls = getLinks index
    for l in ls
      if index is l.source
        s = l.source
        t = l.target
      else
        s = l.target
        t = l.source
      theta = calcTheta s, t
      # TODO: instead of cur.fy, we need SUM of all forces
      cur.fx = G * Math.cos theta
      cur.fy = G * Math.sin theta
    return

  updateVelocity = (index) ->
    nodes[index].vx += nodes[index].fx
    nodes[index].vy += nodes[index].fy

  updatePosition = (index) ->
    nodes[index].x += nodes[index].vx
    nodes[index].y += nodes[index].vy

  update = ->
    for n, index in nodes
      if n.fixed
        continue
      clearForces index
      applyGravity index
      applyTension index
      updateVelocity index
      updatePosition index
    return

  render = ->
    node
      .attr('cx', (d) -> d.x)
      .attr('cy', (d) -> d.y)
      .attr('r', (d) -> 5)
      .style('fill', (d) -> d.fill)

    link
      .attr('x1', (d) -> nodes[d.source].x)
      .attr('y1', (d) -> nodes[d.source].y)
      .attr('x2', (d) -> nodes[d.target].x)
      .attr('y2', (d) -> nodes[d.target].y)
      .style('stroke', (d) -> 'orange')

  setInterval ->
    update()
  , 10

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
