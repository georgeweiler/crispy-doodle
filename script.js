function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var h = 1000
var w = 1000


var enemyNodes = d3.range(500).map(function() { 
  return {
    r: Math.random()*40,
    cx: Math.random() * w,
    cy: Math.random() * h
  }; 
})

// enemyNodes = [{r:20},{r:20},{r:20},{r:20},{r:20}, ... ]

var svg = d3.select('body').append('svg')
  .attr('height', h)
  .attr('width', w)

var enemies = svg.selectAll('circle');

enemies.data(enemyNodes)
  .enter()
  .append('circle')
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
  .attr('r', function(d){return d.r})
  .attr('fill', randomColor())


var circle = svg.selectAll('circle');
circle.data([100])
  .enter()
    .append('circle')
    .attr('cx', 200)
    .attr('cy', 200)
    .attr('r', 30)
    .attr('fill', randomColor())

d3.select('svg').on("mousemove", function () {
  var circles = d3.selectAll('circle')
  var coords = d3.mouse(this);

  circles.transition()
  .duration(2000).ease('linear')
    .attr('cx', coords[0])
    .attr('cy', coords[1]);
 });
