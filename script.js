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

var enemyNodes = d3.range(10).map(function() { 
  return {
    r: 7,
    cx: Math.random() * h,
    cy: Math.random() * w,
    fill: randomColor()
  }; 
})

var svg = d3.select('body').append('svg')
  .attr('height', h)
  .attr('width', w)

var enemies = svg.selectAll('circle')

enemies.data(enemyNodes)
  .enter()
  .append('circle')
  .attr('class', function(d,i){
    return i == 0 ? "user" : "enemy"
  })
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
  .attr('r', function(d){return d.r})
  .attr('fill', function(d){return d.fill})


var user = svg.select('.user')
    .attr('r', 100)
    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy})
    .attr('fill', randomColor())

d3.select('svg').on("mousemove", function () {
  var userCoords = d3.mouse(this);
  user.transition()
  .duration(2000).ease('linear')
    .attr('cx', userCoords[0])
    .attr('cy', userCoords[1]);

  circumference(userCoords)
 });

function circumference(coords){
  var circumferencePoint
  var i = 361
  function loop(i){
    for(i; i<360; i++){
      var circumferenceCoords =
      { 
        x : coords[0] + 5 * Math.cos(i),
        y : coords[1] + 5 * Math.sin(i)
      }
      console.log(circumferenceCoords) 
    }
  }
  if(i>360){
    loop(0)
  }
}



    //loop 1 -> 360
      //{ 
        //x : originX + originR * cos(i)
        //y : originY + originR * sin(i)
      //} 


  //if user's pos === circle pos
    //delete circle
    //increate user size








