var dataset = [10, 20, 30];
var ptData = [];
var npoints = 1;

// var textData = ["we", "don't", "give", "a", "shit", "about", "koalas"]
function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// var coordinates = [0, 0];
// coordinates = d3.mouse();
// var x = coordinates[0];
// var y = coordinates[1];
//
// console.log(coordinates);


var svg = d3.select('body').append('svg')
  .attr("width", 1000)
  .attr("height", 1000);
  // .append('g');

var circle = svg.append('circle')
  .attr('cx', 25)
  .attr('cy', 25)
  .attr('r', 25)
  .style('fill', 'purple');

// var line = d3.svg.circle()
//   .x(function(d, i) { return d[0]; })
//   .y(function(d, i) { return d[1]; });
//

svg.on('mousemove', function() {
  circle
    .attr('opacity', 1)
    .attr('cx', d3.mouse(this)[0] )
    .attr('cy', d3.mouse(this)[1] );
  });
// svg.select('svg').append('circle')
//   .on('mousemove', functi8on() {
//     alert("hello");
//   });

// var svgagain = d3.select('body').select('svg')
//   .on('mousemove', function() {
//     var pt = d3.mouse(this);
//
//     var newData = {
//       x: Math.round( xScale.invert(coords[0])),  // Takes the pixel number to convert to number
//       y: Math.round( yScale.invert(coords[1]))
//     };
//
//     dataset.push(newData);
//
//     svg.selectAll('circle')
//       .data(dataset)
//       .enter()
//       .append('circle')
//       .attr(circleAttrs)
//       .on('mouseover', handleMouseOver)
//       .on('mouseout', handleMouseOut);
//     })
//
// var path = svg.append('g')
//   .append('path')
//     .data([ptData])
//     .attr('class', 'line')
//     .attr('d', line);
//
// function tick(pt) {
//   ptData.push(pt);
//   path.attr('d', function(d) {return line(d);})
//
//   if(ptData.length > npoints) {
//     ptData.shift();
//   }
// }
// var svg = d3.select('body')
//   .append('svg')
//   .attr("class", "container")
//   .on("mousemove", function() {
//     curPos = d3.mouse(this);
//     ptData = {
//       x : curPos[0],
//       y : curPos[1]
//     }
//     // displayCircle()
//   });


// function displayCircle() {
//   console.log(ptData)
//   svg.selectAll('circle')
//     .data(ptData)
//     .enter()
//     .append("circle")
//     .attr("r", 20)
//     .attr("cx", function(d){return d.x})
//     .attr("cy", function(d){return d.y})
//     .attr("fill", () => randomColor())
// }
