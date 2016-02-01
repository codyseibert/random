$(document).ready ->
  $svg = $('#svg')
  OFFSET = 500

  medium = null

  isLeft = (a, b, c) ->
    ((b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x)) > 0

  svgEl = (tag) ->
    $ document.createElementNS 'http://www.w3.org/2000/svg', tag

  isIntersecting = (lineA, lineB) ->
    p0_x = lineA.p1.x
    p0_y = lineA.p1.y
    p1_x = lineA.p2.x
    p1_y = lineA.p2.y

    p2_x = lineB.p1.x
    p2_y = lineB.p1.y
    p3_x = lineB.p2.x
    p3_y = lineB.p2.y

    s1_x = p1_x - p0_x
    s1_y = p1_y - p0_y
    s2_x = p3_x - p2_x
    s2_y = p3_y - p2_y

    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y)
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y)

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
      new Point p0_x + (t * s1_x), p0_y + (t * s1_y)
    else
      return undefined

  drawIntersection = (lineA, lineB) ->
    intersection = isIntersecting lineA, lineB
    if intersection?
      $svg.append intersection.$

  class Line
    constructor: (@p1, @p2, color = 'yellow') ->
      @$ = svgEl 'line'
        .addClass 'line'
        .attr 'stroke', color
      @refresh()

    refresh: ->
      @$
        .attr 'x1', @p1.x
        .attr 'y1', -@p1.y + OFFSET
        .attr 'x2', @p2.x
        .attr 'y2', -@p2.y + OFFSET

      @angle = Math.atan2 @p2.y - @p1.y, @p2.x - @p1.x

      @normal = new Victor(Math.cos(@angle), Math.sin(@angle))
      @normal.rotate -Math.PI / 2
      @normal.normalize()

      @vec = new Victor(@p2.x, @p2.y)
      @vec.subtract new Victor(@p1.x, @p1.y)
      full = @vec.clone()
      p1 = new Victor(@p1.x, @p1.y)
      @vec.normalize()

      divide = full.multiply(new Victor(0.5, 0.5))
      @midpoint = p1.add(divide)

  class Point
    constructor: (@x, @y) ->
      @$ = svgEl 'circle'
        .attr 'r', '5'
        .attr 'fill', 'white'
        .attr 'cx', @x
        .attr 'cy', -@y + OFFSET

  class Medium
    constructor: (@coef, @sides) ->

  class LightSource
    constructor: (@center, @numRays = 5, @theta = 0, @distsance = 5) ->

  refractr = (line, medium) ->
    seen = {}

    fun = (line, medium) ->
      seen[line.p1.x + ' ' + line.p1.y] = true

      intersections = []
      for side in medium.sides
        intersection = isIntersecting line, side
        if intersection?
          intersections.push
            intersection: intersection
            side: side

      p1 = line.p1
      vec1 = new Victor p1.x, p1.y
      distances = []

      for intersection in intersections
        inter = intersection.intersection
        vec2 = new Victor inter.x, inter.y
        distance = vec2.distanceSq vec1
        distances.push
          distance: distance
          point: inter
          side: intersection.side

      distances.sort (a, b) ->
        a.distance - b.distance

      if distances.length > 1 and Math.round(distances[0].point.x) is Math.round(line.p1.x) and Math.round(distances[0].point.y) is Math.round(line.p1.y)
        distances.splice 0, 1

      if distances.length > 0 and Math.round(distances[0].point.x) isnt Math.round(line.p1.x) and Math.round(distances[0].point.y) isnt Math.round(line.p1.y)
        closest = distances[0]

        line.p2 = closest.point
        line.refresh()
        dot = closest.side.normal.dot(line.vec)
        incident = Math.acos(dot)
        if isNaN incident
          incident = 0

        norm = closest.side.normal.clone()

        if dot < 0 # outside of medium
          theta2 = Math.asin(Math.sin(incident) / closest.side.coef)
          norm.multiply(new Victor(-1, -1))
          if isLeft closest.point, new Victor(closest.point.x, closest.point.y).add(norm), line.p1
            theta2 *= -1
        else # inside medium
          theta2 = Math.asin(Math.sin(incident) * closest.side.coef)
          if isLeft closest.point, new Victor(closest.point.x, closest.point.y).add(norm), line.p1
            theta2 *= -1

        newVec = norm.rotate theta2
        newVec.multiply(new Victor 1000000, 1000000)
        p1 =
          x: closest.point.x
          y: closest.point.y
        p2 =
          x: closest.point.x + newVec.x
          y: closest.point.y + newVec.y

        if not isNaN(p1.x) and not isNaN(p1.y) and not isNaN(p2.x) and not isNaN(p2.y)
          newLine = new Line p1, p2
          $svg.append newLine.$
          newLine.$.addClass 'ray'

          if not seen[newLine.p1.x + ' ' + newLine.p1.y]?
            fun newLine, medium
    fun line, medium

  lightModeClick = (event) ->
    x = event.pageX
    y = $svg.height() - event.pageY - 200
    $svg.find('.ray').remove()

    angle = 0
    DIST = 10000
    RAYS = 500
    step = 2 * Math.PI / RAYS
    for i in [0...RAYS]
      angle += step
      line = new Line new Point(x, y), new Point(x + Math.cos(angle) * DIST, y + Math.sin(angle) * DIST)
      $svg.append line.$
      line.$.addClass 'ray'
      refractr line, medium

  placeTriangle = (cx, cy, color = 'cyan') ->
    coef = 1.5

    lines = [
      new Line new Point(cx + 100, cy + 100), new Point(cx, cy), color
      new Line new Point(cx + 200, cy), new Point(cx + 100, cy + 100), color
      new Line new Point(cx, cy), new Point(cx + 200, cy), color
    ]
    medium = new Medium 1.5, lines

    for elem in lines
      $svg.append elem.$

      # draw normals
      mid = elem.midpoint.clone().add(elem.normal.clone().multiply(new Victor(30, 30)))
      line = new Line new Point(elem.midpoint.x, elem.midpoint.y), new Point(mid.x, mid.y), 'red'
      $svg.append line.$

  editModeClick = (event) ->
    $svg.find('.line').remove()
    placeTriangle event.pageX, $svg.height() - event.pageY - 200

  $svg.click (event) ->
    if mode is 'light'
      lightModeClick event
    else
      editModeClick event

  mode = 'light'

  $('.edit').click ->
    mode = 'edit'
    $svg.find('.line').remove()
    $svg.find('.ray').remove()

  $('.light').click ->
    mode = 'light'

  $('.edit').click()
