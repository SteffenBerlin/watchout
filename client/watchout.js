var enemyData = [[10, 200], [50, 50], [300, 45]];


var svg = d3.select('.board').append('svg')
            .attr('width', '500')
            .attr('height', '500');
// var enemies = d3.select('.board').selectAll('svg')
//   .data(enemyData)
//   .enter()
//   .append('svg')
//   .attr('class', 'enemy');


// enemies.style()

var enemies = svg.selectAll('circle')
                 .data(enemyData)
                 .enter()
                 .append('circle');

enemies.attr('fill', 'yellow')
       .attr('cx', function(d){return d[1];})
       .attr('cy', function(d) {return d[0];})
       .attr('r', '40');