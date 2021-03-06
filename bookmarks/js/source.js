// Generated by CoffeeScript 1.9.1
(function() {
  $(document).ready(function() {
    var Link, MAX, Node, PUSH, circles, cx, cy, getRandomNumber, h, head, links, nodes, randomColor, rects, recursiveAnim, refresh, render, save, saving, selected, svg, sx, sy, texts, update, w;
    nodes = JSON.parse(localStorage.getItem('nodes' || '[]'));
    links = JSON.parse(localStorage.getItem('links' || '[]'));
    sx = null;
    sy = null;
    selected = null;
    cx = 0;
    cy = 0;
    MAX = 200;
    PUSH = 5;
    getRandomNumber = function(a) {
      var r;
      r = Math.random() * a;
      if (r < 10 && r > 0) {
        r += 20;
      }
      if (r > -10 && r < 0) {
        r -= 20;
      }
      return r;
    };
    Node = (function() {
      Node.ids = nodes.length;

      function Node() {
        this.id = Node.ids++;
        this.x = 0;
        this.y = 0;
        this.parent = null;
        this.children = [];
        this.notes = '';
        this.title = '';
        this.on = false;
        nodes.push(this);
      }

      Node.prototype.setParent = function(parent) {
        var dir, id, inner, j, k, len, n2, outer, ref, sum;
        this.parent = parent.id;
        sum = V(0, 0);
        inner = V(parent.x, parent.y);
        ref = parent.children;
        for (j = k = 0, len = ref.length; k < len; j = ++k) {
          id = ref[j];
          n2 = nodes[id];
          outer = V(n2.x, n2.y);
          sum = sum.add(inner.sub(outer));
        }
        dir = sum.unit();
        if ((!isNaN(dir.x)) && (!isNaN(dir.y)) && parent.children.length > 2) {
          dir = dir.mult(50);
          this.x = dir.x + parent.x;
          this.y = dir.y + parent.y;
        } else {
          this.x = parent.x + getRandomNumber(50);
          this.y = parent.y + getRandomNumber(50);
        }
        parent.children.push(this.id);
        links.push(new Link(parent.id, this.id));
        return this;
      };

      return Node;

    })();
    Link = (function() {
      Link.ids = links.length;

      function Link(source, target) {
        this.id = Link.ids++;
        this.source = source;
        this.target = target;
      }

      return Link;

    })();
    randomColor = function() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };
    w = $(document).width();
    h = $(document).height();
    svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
    $(window).on('resize', function() {
      w = $(document).width();
      h = $(document).height();
      svg.attr('width', w);
      return svg.attr('height', h);
    });
    $(window).on('mousedown', function(e) {
      sx = e.clientX;
      return sy = e.clientY;
    });
    $(window).on('mouseup', function(e) {
      sx = null;
      return sy = null;
    });
    $(window).on('mousemove', function(e) {
      var dx, dy;
      if ((sx != null) && (sy != null)) {
        dx = e.clientX - sx;
        dy = e.clientY - sy;
        sx = e.clientX;
        sy = e.clientY;
        cx += dx;
        return cy += dy;
      }
    });
    saving = null;
    save = function() {
      if (!saving) {
        return setTimeout(function() {
          localStorage.setItem('nodes', JSON.stringify(nodes));
          return saving = false;
        }, 1000);
      }
    };
    $('#title').on('input propertychange', function() {
      if (selected) {
        selected.title = $(this).val();
        return save();
      }
    });
    $('#notes').on('input propertychange', function() {
      if (selected) {
        selected.notes = $(this).val();
        return save();
      }
    });
    if (nodes.length === 0) {
      head = new Node();
      head.x = w / 2;
      head.y = h / 2;
    }
    circles = null;
    rects = null;
    texts = null;
    refresh = function() {
      var node;
      svg.selectAll('.link').data(links, function(d) {
        return d.id;
      }).enter().insert('line', ':first-child').classed('link', true);
      node = svg.selectAll('.node').data(nodes, function(d) {
        return d.id;
      }).enter().append('g').classed('node', true).on('dblclick', function(node) {
        new Node().setParent(node);
        return refresh();
      });
      node.append('circle').on('mouseover', function(d) {
        return d.over = true;
      }).on('mouseout', function(d) {
        return d.over = false;
      }).on('click', function(node) {
        if (selected) {
          selected.selected = false;
        }
        node.selected = true;
        selected = node;
        $('#notes').val(selected.notes);
        $('#title').val(selected.title);
        return $('#panel a').html(node.link);
      });
      node.append('text');
      localStorage.setItem('nodes', JSON.stringify(nodes));
      return localStorage.setItem('links', JSON.stringify(links));
    };
    refresh();
    update = function() {
      var dif, dir, i, inner, j, k, l, len, len1, mag, n1, n2, norm, outer, results, sum;
      results = [];
      for (i = k = 0, len = nodes.length; k < len; i = ++k) {
        n1 = nodes[i];
        if (n1.locked) {
          continue;
        }
        sum = V(0, 0);
        inner = V(n1.x, n1.y);
        for (j = l = 0, len1 = nodes.length; l < len1; j = ++l) {
          n2 = nodes[j];
          if (n1 === n2) {
            continue;
          }
          outer = V(n2.x, n2.y);
          dif = inner.sub(outer);
          mag = dif.mag();
          norm = 1.0 - Math.min(mag, MAX) / MAX;
          dir = dif.unit();
          if ((!isNaN(dir.x)) && (!isNaN(dir.y))) {
            sum = sum.add(dir.mult(norm * PUSH));
          }
        }
        inner = inner.add(sum);
        n1.x = inner.x;
        results.push(n1.y = inner.y);
      }
      return results;
    };
    render = function() {
      svg.selectAll('.link').attr('x1', function(d) {
        return nodes[d.source].x + cx;
      }).attr('y1', function(d) {
        return nodes[d.source].y + cy;
      }).attr('x2', function(d) {
        return nodes[d.target].x + cx;
      }).attr('y2', function(d) {
        return nodes[d.target].y + cy;
      });
      svg.selectAll('.node').attr('transform', function(d) {
        return "translate(" + (d.x + cx) + "," + (d.y + cy) + ")";
      });
      svg.selectAll('.node circle').attr('cx', 0).attr('cy', 0).attr('r', 30).attr('fill', function(d) {
        if (d.over) {
          return 'gray';
        } else {
          return 'white';
        }
      }).attr('stroke', 'orange').attr('stroke-width', function(d) {
        if (d.selected) {
          return '6px';
        } else {
          return '0px';
        }
      });
      return svg.selectAll('.node text').text(function(d) {
        return d.title;
      }).attr('x', 0).attr('y', 0).attr('fill', 'red').attr('font-size', '20px');
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
