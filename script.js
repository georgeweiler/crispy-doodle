var dataset = [1];
var pointData = [{x:0, y:0}]
// var textData = ["we", "don't", "give", "a", "shit", "about", "koalas"]
function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


var svg = d3.select('body')
.append('svg')
.attr("class", "container")
.on("mousemove", function() { 
  curPos = d3.mouse(this); 
  pointData = {
    x : curPos[0],
    y : curPos[1]
  }
  displayCircle()
});


function displayCircle() {
  console.log(pointData)
  svg.selectAll('circle')
    .data(pointData)
    .enter()
    .append("circle")
    .attr("r", 20)
    // .attr("cx", function(d){return d.x})
    // .attr("cy", function(d){return d.y})
    .attr("fill", () => randomColor())
}

