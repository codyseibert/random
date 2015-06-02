$(document).ready ->

  width = 640
  height = 480

  nodes = [
    x: width / 3
    y: height / 2
  ,
    x: 2 * width / 3
    y: height / 2
  ]

  links = [
    source: 0
    target: 1
  ]

  svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  force = d3.layout.force()
    .size([width, height])
    .nodes(nodes)
    .links(links)

  force.linkDistance(width / 2);

  link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');

  node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')
    .attr('class', 'node');

  force.on 'tick', ->
    node.attr('r', width / 25)
      .attr('cx', (d) -> d.x)
      .attr('cy', (d) -> d.y)

    link.attr('x1', (d) -> d.source.x)
      .attr('y1', (d) -> d.source.y)
      .attr('x2', (d) -> d.target.x)
      .attr('y2', (d) -> d.target.y)


  force.start()
