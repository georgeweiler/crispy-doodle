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

var svg = d3.select('body').append('svg')
  .attr('height', h)
  .attr('width', w)

var nodes = d3.range(10).map(function() {
  return {
    r: Math.random() * 15 + 5,
    cx: 0,
    cy: Math.random() * w,
    fill: randomColor()
    // transition: randomPosition()
  };
})

//////////////////////////////////////////////////
////////// Random Enemies
//////////////////////////////////////////////////
svg.selectAll('circle')
  .data([100])
  .enter()
  .append('circle')
  .attr('class', 'user')
  .attr('fill', 'red')
  .attr('r', 50)


var dots = svg.selectAll('circle')
getSides = function(){
  sides = {}
  var choice = Math.random(); 
  if(choice > 0.5){
    sides.start = 0
    sides.end = w
  }
  else {
    sides.start = w
    sides.end = 0
  }
  return sides
}
setInterval(function(){
  var sides = getSides()
  dots
  .data(nodes)
  .enter()
  .append('circle')
  .attr('class', "enemy")
  .attr('cx', sides.start)
  .attr('cy', Math.random()*h)
  .attr('r', Math.random()*60)
  .attr('fill', randomColor()) 
  .transition().ease('linear')
    .duration(Math.random()*5000 + 2000)
    .attr('cx', sides.end)
    .remove()
}, 1000)  

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
  // console.log(userCoords)
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
        userRadius += 0.33
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