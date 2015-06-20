$(document).ready ->

  class Node

    @ids = 0

    constructor: () ->
      @id = Node.ids++
      @x = 0
      @y = 0
      @parent = null
      @text = ''
      @children = []

    setParent: (parent) ->
      if @parent
        @parent.remove @
      @parent = parent
      @

    remove: (child) ->
      @children.splice @children.indexOf child, 1
      child

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

  head = new Node()
  nodes = [head]

  child = new Node()
  child.setParent head
  nodes.push child

  head.x = w / 2
  head.y = h / 2

  child.x = head.x - 1
  child.y = head.y - 1

  circles = null
  rects = null
  texts = null

  # link = svg.selectAll('.link')
  #   .data(links)
  #   .enter().append('line')

  node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle').classed('node', true)

  console.log node

  update = ->
    MAX = 100

    for n1, i in nodes
      sum = V 0, 0
      inner = V n1.x, n1.y
      for n2, j in nodes
        continue if n1 == n2
        outer = V n2.x, n2.y
        sum = sum.add inner.sub outer

      if sum.x isnt 0 or sum.y isnt 0
        mag = sum.mag()
        norm = 1.0 - Math.min(mag, MAX) / MAX
        dir = sum.unit()
        inner = inner.add dir.mult norm * 5
        n1.x = inner.x
        n1.y = inner.y

      # .on('dblclick', (nodeClicked) ->
      #   newNode = new Node
      #   newNode.setParent nodeClicked
      #   nodes.push newNode
      #   update()
      # )

  render = ->
    # links
    #   .attr('x1', (d) -> d.source.x)
    #   .attr('y1', (d) -> d.source.y)
    #   .attr('x2', (d) -> d.target.x)
    #   .attr('y2', (d) -> d.target.y)

    node
      .attr('cx', (d) -> d.x)
      .attr('cy', (d) -> d.y)
      .attr('r', 40)


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
