$(document).ready ->

  nodes = []
  links = []
  sx = null
  sy = null
  cx = 0
  cy = 0

  class Node
    @ids = 0

    constructor: ->
      @id = Node.ids++
      @x = 0
      @y = 0
      @parent = null
      @text = ''
      @children = []
      nodes.push @

    setParent: (parent) ->
      if @parent
        @parent.remove @
      @parent = parent
      parent.children.push @
      @x = parent.x - Math.random() * 20 + 10
      @y = parent.y - Math.random() * 20 + 10
      links.push new Link parent, @
      @

    remove: (child) ->
      @children.splice @children.indexOf child, 1
      child

  class Link
    @ids = 0

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

  head = new Node()
  head.x = w / 2
  head.y = h / 2

  link = null
  node = null

  circles = null
  rects = null
  texts = null

  new Node().setParent head
  new Node().setParent head
  new Node().setParent head
  new Node().setParent head
  new Node().setParent head
  new Node().setParent head
  new Node().setParent head

  refresh = ->
    svg.selectAll('.link')
      .data(links, (d) -> d.id)
      .enter()
        .insert('line', ':first-child')
        .classed('link', true)

    svg.selectAll('.node')
      .data(nodes, (d) -> d.id)
      .enter()
        .append('circle')
        .classed('node', true)
        .on('dblclick', (nodeClicked) ->
          new Node().setParent nodeClicked
          refresh()
        )
  refresh()

  update = ->
    MAX = 200
    PUSH = 5

    for n1, i in nodes
      sum = V 0, 0
      inner = V n1.x, n1.y
      for n2, j in nodes
        continue if n1 == n2
        outer = V n2.x, n2.y
        dif = inner.sub outer
        mag = dif.mag()
        norm = 1.0 - Math.min(mag, MAX) / MAX
        dir = dif.unit()
        sum = sum.add dir.mult norm * PUSH
      inner = inner.add sum
      n1.x = inner.x
      n1.y = inner.y

  render = ->
    svg.selectAll('.link')
      .attr('x1', (d) -> d.source.x + cx)
      .attr('y1', (d) -> d.source.y + cy)
      .attr('x2', (d) -> d.target.x + cx)
      .attr('y2', (d) -> d.target.y + cy)

    svg.selectAll('.node')
      .attr('cx', (d) -> d.x + cx)
      .attr('cy', (d) -> d.y + cy)
      .attr('r', 40)

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
