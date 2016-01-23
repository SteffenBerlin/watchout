

var enemyData = [[10, 200], [50, 50], [300, 45]];


var svg = d3.select('.board').append('svg')
            .attr('width', '500')
            .attr('height', '500');




var updateEnemies = function(enemyData) {

  var enemies = svg.selectAll('circle')
                 .data(enemyData, function(i) {return i;});

  // enemies.attr('class', 'update');

  enemies.enter().append('circle')
               .attr('class', 'enter')
               .attr('fill', 'yellow')
               .attr('cx', function(d){return d[1];})
               .attr('cy', function(d) {return d[0];})
               .attr('r', '40');

  enemies.exit().remove();
};

var newEnemyData = function(){
  function randomHelper(){
    return [Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)];
  }
  for(var i = 0; i < enemyData.length; i++){
    enemyData[i]=randomHelper();
  }
  updateEnemies(enemyData);
};





setInterval(function() {
  newEnemyData();
  }, 1000);

