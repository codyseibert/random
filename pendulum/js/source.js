// Generated by CoffeeScript 1.9.1
(function() {
  $(document).ready(function() {
    var G, HEIGHT, MAX_DIST, WIDTH, applyGravity, applyTension, calcDistance, calcTheta, clearForces, getLinks, isLinkFullyExtended, link, links, node, nodes, randomColor, recursiveAnim, render, svg, update, updatePosition, updateVelocity;
    WIDTH = $(document).width();
    HEIGHT = $(document).height();
    randomColor = function() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };
    svg = d3.select('body').append('svg').attr('width', WIDTH).attr('height', HEIGHT);
    $(window).on('resize', function() {
      svg.attr('width', $(document).width());
      return svg.attr('height', $(document).height());
    });
    MAX_DIST = 100;
    nodes = [
      {
        x: WIDTH / 2,
        y: 200,
        fx: 0,
        fy: 0,
        vx: 0,
        vy: 0,
        fixed: true,
        fill: 'white'
      }, {
        x: WIDTH / 2 + 40,
        y: 250,
        fx: 0,
        fy: 0,
        vx: 0,
        vy: 0,
        fill: 'red'
      }
    ];
    links = [
      {
        source: 0,
        target: 1
      }
    ];
    node = svg.selectAll('.node').data(nodes).enter().append('circle');
    link = svg.selectAll('.link').data(links).enter().append('line');
    getLinks = function(index) {
      var i, j, len, li, ls;
      ls = [];
      for (i = j = 0, len = links.length; j < len; i = ++j) {
        li = links[i];
        if (li.target === index) {
          if (ls.indexOf(li.target === -1)) {
            ls.push(li);
          }
        }
        if (li.source === index) {
          if (ls.indexOf(li.source === -1)) {
            ls.push(li);
          }
        }
      }
      return ls;
    };
    calcDistance = function(s, t) {
      var dx, dy;
      dx = s.x - t.x;
      dx *= dx;
      dy = s.y - t.y;
      dy *= dy;
      return Math.sqrt(dx + dy);
    };
    isLinkFullyExtended = function(index) {
      var apply, dist, j, l, len, ls;
      ls = getLinks(index);
      apply = false;
      for (j = 0, len = ls.length; j < len; j++) {
        l = ls[j];
        dist = calcDistance(nodes[l.source], nodes[l.target]);
        if (dist > MAX_DIST) {
          apply = true;
        }
      }
      return apply;
    };
    calcTheta = function(index1, index2) {
      var node1, node2;
      node1 = nodes[index1];
      node2 = nodes[index2];
      return Math.atan2(node2.y - node1.y, node2.x - node1.x);
    };
    clearForces = function(index) {
      nodes[index].fx = 0;
      return nodes[index].fy = 0;
    };
    G = 0.2;
    applyGravity = function(index) {
      return nodes[index].fy += G;
    };
    applyTension = function(index) {
      var cur, j, l, len, ls, s, t, theta;
      cur = nodes[index];
      if (!isLinkFullyExtended(index)) {
        return;
      }
      ls = getLinks(index);
      for (j = 0, len = ls.length; j < len; j++) {
        l = ls[j];
        if (index === l.source) {
          s = l.source;
          t = l.target;
        } else {
          s = l.target;
          t = l.source;
        }
        theta = calcTheta(s, t);
        cur.fx = G * Math.cos(theta);
        cur.fy = G * Math.sin(theta);
      }
    };
    updateVelocity = function(index) {
      nodes[index].vx += nodes[index].fx;
      return nodes[index].vy += nodes[index].fy;
    };
    updatePosition = function(index) {
      nodes[index].x += nodes[index].vx;
      return nodes[index].y += nodes[index].vy;
    };
    update = function() {
      var index, j, len, n;
      for (index = j = 0, len = nodes.length; j < len; index = ++j) {
        n = nodes[index];
        if (n.fixed) {
          continue;
        }
        clearForces(index);
        applyGravity(index);
        applyTension(index);
        updateVelocity(index);
        updatePosition(index);
      }
    };
    render = function() {
      node.attr('cx', function(d) {
        return d.x;
      }).attr('cy', function(d) {
        return d.y;
      }).attr('r', function(d) {
        return 5;
      }).style('fill', function(d) {
        return d.fill;
      });
      return link.attr('x1', function(d) {
        return nodes[d.source].x;
      }).attr('y1', function(d) {
        return nodes[d.source].y;
      }).attr('x2', function(d) {
        return nodes[d.target].x;
      }).attr('y2', function(d) {
        return nodes[d.target].y;
      }).style('stroke', function(d) {
        return 'orange';
      });
    };
    setInterval(function() {
      return update();
    }, 10);
    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return setTimeout(render, 1000 / 60);
      };
    })();
    return (recursiveAnim = function() {
      render();
      return requestAnimationFrame(recursiveAnim);
    })();
  });

}).call(this);