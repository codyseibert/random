$(document).ready ->

  nodes = JSON.parse localStorage.getItem 'nodes' or '[]'
  links = JSON.parse localStorage.getItem 'links' or '[]'
  nodes = []
  links = []

  sx = null
  sy = null
  cx = 0
  cy = 0

  MAX = 200
  PUSH = 5

  getRandomNumber = (a) ->
    r = Math.random() * a
    if r < 10 and r > 0
      r += 20
    if r > -10 and r < 0
      r -= 20
    r

  class Node
    @ids = nodes.length

    constructor: ->
      @id = Node.ids++
      @x = 0
      @y = 0
      @parent = null
      @children = []
      @link = null
      @text = 'asdfasdf'
      nodes.push @

    setParent: (parent) ->
      @parent = parent.id
      sum = V 0, 0
      inner = V parent.x, parent.y
      for id, j in parent.children
        n2 = nodes[id]
        outer = V n2.x, n2.y
        sum = sum.add inner.sub outer
      dir = sum.unit()
      if (not isNaN dir.x) and (not isNaN dir.y) and parent.children.length > 2
        dir = dir.mult 50
        @x = dir.x + parent.x
        @y = dir.y + parent.y
      else
        @x = parent.x + getRandomNumber 50
        @y = parent.y + getRandomNumber 50

      parent.children.push @id
      links.push new Link parent.id, @id
      @

  class Link
    @ids = links.length
    constructor: (source, target) ->
      @id = Link.ids++
      @source = source
      @target = target

  randomColor = ->
    '#'+Math.floor(Math.random()*16777215).toString(16);

  w = $(document).width()
  h = $(document).height()

  svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

  $(window).on 'resize', ->
    w = $(document).width()
    h = $(document).height()
    svg.attr 'width', w
    svg.attr 'height', h

  $(window).on 'mousedown', (e) ->
    sx = e.clientX
    sy = e.clientY

  $(window).on 'mouseup', (e) ->
    sx = null
    sy = null

  $(window).on 'mousemove', (e) ->
    if sx? and sy?
      dx = e.clientX - sx
      dy = e.clientY - sy
      sx = e.clientX
      sy = e.clientY
      cx += dx
      cy += dy

  if nodes.length is 0
    head = new Node()
    head.x = w / 2
    head.y = h / 2

  circles = null
  rects = null
  texts = null

  refresh = ->
    svg.selectAll('.link')
      .data(links, (d) -> d.id)
      .enter()
        .insert('line', ':first-child')
        .classed('link', true)

    node = svg.selectAll('.node')
      .data(nodes, (d) -> d.id)
      .enter()
      .append('g')
      .classed('node', true)
      .on('dblclick', (nodeClicked) ->
        new Node().setParent nodeClicked
        refresh()
      )
    node.append('circle')
    node.append('text')

    localStorage.setItem 'nodes', JSON.stringify nodes
    localStorage.setItem 'links', JSON.stringify links
  refresh()

  update = ->
    for n1, i in nodes
      continue if n1.locked
      sum = V 0, 0
      inner = V n1.x, n1.y
      for n2, j in nodes
        continue if n1 == n2
        outer = V n2.x, n2.y
        dif = inner.sub outer
        mag = dif.mag()
        norm = 1.0 - Math.min(mag, MAX) / MAX
        dir = dif.unit()
        if (not isNaN dir.x) and (not isNaN dir.y)
          sum = sum.add dir.mult norm * PUSH
      inner = inner.add sum
      n1.x = inner.x
      n1.y = inner.y

    # for n1, i in nodes
    #   inner = V n1.x, n1.y
    #   if n1.parent isnt null
    #     parent = nodes[n1.parent]
    #     outer = V parent.x, parent.y
    #     dif = outer.sub inner
    #     mag = dif.mag()
    #     if mag > MAX
    #       n1.locked = true
    #       setTimeout ->
    #         n1.locked = false
    #       , 1000

  render = ->
    svg.selectAll('.link')
      .attr('x1', (d) -> nodes[d.source].x + cx)
      .attr('y1', (d) -> nodes[d.source].y + cy)
      .attr('x2', (d) -> nodes[d.target].x + cx)
      .attr('y2', (d) -> nodes[d.target].y + cy)

    svg.selectAll('.node')
      .attr('transform', (d) -> "translate(#{d.x + cx},#{d.y + cy})")

    svg.selectAll('.node circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 30)

    svg.selectAll('.node text')
      .text((d) -> d.text)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'red')
      .attr('font-size', '20px')

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


# rects = nodes
#   .append('rect')
#   .attr('class', 'rectangle')
#   .attr('rx', 5)
#   .attr('ry', 5)
#   .attr('width', 200)
#   .attr('height', 50)
#   .attr('x', 0)
#   .attr('y', -20)



# texts = nodes.append('text')
# .text((d) ->
#   d.text
# )
# .attr('x', 0)
# .attr('y', 5)
# .attr('font-size', '20px')
