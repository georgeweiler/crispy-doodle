var dataset = [1,2,3,4,5,6,7];
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
.attr("class", "container");

svg.selectAll('text')
.data(dataset)
.enter()
.append("text")
.text(function(d){
    return d
  })


var circles = svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append("circle")
  

circles
.attr("r", function(d){return d*5})
.attr("cx", function(d,i){return i*75 + 50})
.attr("cy", 50)
.attr("fill", () => randomColor())
