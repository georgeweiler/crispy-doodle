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

var nodes = d3.range(3).map(function() { 
  return {
    r: 20,
    cx: Math.random() * h,
    cy: Math.random() * w,
    fill: randomColor()
  }; 
})

var svg = d3.select('body').append('svg')
  .attr('height', h)
  .attr('width', w)

var dots = svg.selectAll('circle')

dots.data(nodes)
  .enter()
  .append('circle')
  .attr('class', function(d,i){
    return i == 0 ? "user" : "enemy"
  })
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
  .attr('r', function(d){return d.r})
  .attr('fill', function(d){return d.fill})

var userRadius = function(){
  return 50
}

var user = svg.select('.user')
    .attr('r', userRadius())
    // .attr('cx', function(d){return d.cx})
    // .attr('cy', function(d){return d.cy})
    // .attr('fill', randomColor())

d3.select('svg').on("mousemove", function () { 
  var userCoords = d3.mouse(this),
      uX = userCoords[0],
      uY = userCoords[1]
 
  user.transition()
  .duration(5).ease('linear')
    .attr('cx', uX)
    .attr('cy', uY);

  var enemies = svg.selectAll('.enemy')
  enemies[0].forEach(function(enemy){
    eX = enemy.cx
    eY = enemy.cy
    if(checkCollision(uX, uY, eX, eY, userRadius())){
     console.log("COLISION!")
     // enemies.exit().remove()
    } 
  })
 });

function checkCollision(uX, uY, eX, eY, r){
  return Math.pow((uX - eX),2) + Math.pow((uY - eY),2)  < Math.pow(r, 2)  
}








