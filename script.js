function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var h = 500
var w = 500

var nodes = d3.range(10).map(function() {
  return {
    r: 5,
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

// Set initial radius of user
var userRadius = 10;

// Assign variable user to class user and set radius to userRadius
var user = svg.select('.user')
    .attr('r', userRadius)

// Get X, Y coordinates of cursor
d3.select('svg').on("mousemove", function () {
  var userCoords = d3.mouse(this),
      uX = userCoords[0],
      uY = userCoords[1]

  user.transition()
  .duration(5).ease('linear')
    .attr('cx', uX)
    .attr('cy', uY);

  // Enemies refers to an array of all static edible objects
  var enemies = svg.selectAll('.enemy')[0].slice(0);

  // Prep for collisionCheck: loop through enemies and extract cX and cY
  enemies.forEach(function(enemy){
    // console.log("enemy: " + enemy.cx.baseVal.value);
    eX = enemy.cx.baseVal.value;
    eY = enemy.cy.baseVal.value;

    if(checkCollision(uX, uY, eX, eY, userRadius)) {
      // Remove enemy where collision check is true
      enemy.remove();
      // Increase userRadius upon collision by 1/2 the radius of enemy
      userRadius += 0.5 * enemy.r.baseVal.value;
      // Update user object with updated radius
      user.attr('r', userRadius)
      console.log("current user radius: ", user[0][0].r.baseVal.value);
    }
  })
 });

function checkCollision(uX, uY, eX, eY, r){
  return Math.pow((uX - eX),2) + Math.pow((uY - eY),2) < Math.pow(r, 2)
}
