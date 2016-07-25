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

var nodes = d3.range(50).map(function() {

  return {
    r: Math.random() * 15 + 5,
    cx: Math.random() * h,
    cy: Math.random() * w,
    fill: randomColor(),
    transition: randomPosition()
  };
})

function randomPosition() {
  return {x: Math.random() * w, y: Math.random() * h};
}

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
  .transition()
    .duration(20000).ease('linear')
    .attr('cx', function(d) {return d.transition.x})
    .attr('cy', function(d) {return d.transition.y})
    .each('end', randomTransition);

function randomTransition() {
  var dots = svg.selectAll('enemies')
  dots.transition()
    .duration(100000).ease('linear')
    .attr('cx', function(d) {return d.transition.x})
    .attr('cy', function(d) {return d.transition.y});
}

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
      // If smaller than enemy, you lose
      if(userRadius < enemy.r.baseVal.value) {
          alert("you lose")
      }
      // Else eat enemy
      else {
        // Remove enemy where collision check is true
        enemy.remove();
        // Increase userRadius upon collision by 1/5 the radius of enemy
        userRadius += 0.20 * enemy.r.baseVal.value;
        // Update user object with updated radius
        user.attr('r', userRadius)
        console.log("current user radius: ", user[0][0].r.baseVal.value);
      }
    }
  })
 });

function checkCollision(uX, uY, eX, eY, r){
  return Math.pow((uX - eX),2) + Math.pow((uY - eY),2) < Math.pow(r, 2)
}


// Next steps
  // Have user circle follow a path
  // Collision check does not fire until circle is there
