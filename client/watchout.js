
var numberEnemies = prompt("How many enemies can you handle?!");

if(typeof parseInt(numberEnemies) !== 'number') {
  numberEnemies = 5;
}

var svg = d3.select('.board').append('svg')
            .attr('width', '500')
            .attr('height', '500');


var enemyData = new Array(numberEnemies);

var enemies;

var player;

var createEnemies = function(enemyData) {
  enemies = svg.selectAll('circle')
               .data(enemyData)
               .enter()
               .append('circle')
               .attr('class', 'enter')
               .attr('fill', '#FF8C42')
               .attr('cx', function(d){return d[1];})
               .attr('cy', function(d) {return d[0];})
               .attr('r', '10');
};

var initialize = function(noEn, enemData){
  for (var i = 0; i <= noEn; i++) {
    enemyData[i] = [Math.floor(Math.random() * 490 + 5), Math.floor(Math.random() * 490 + 5)];
  }
  player = svg.append('circle')
              .attr('cx', '250')
              .attr('cy', '250')
              .attr('fill', '#54494B')
              .attr('r', '10')
              .call(drag);

  createEnemies(enemData);
};


var moveEnemies = function(enemyData) {

  enemies.data(enemyData)
         .transition()
         .duration(500)
         .attr('cx', function(d){return d[1];})
         .attr('cy', function(d) {return d[0];});

  // enemies.exit().remove();
};

var newEnemyData = function(){
  function randomHelper(){
    return [Math.floor(Math.random() * 490 + 5), Math.floor(Math.random() * 490 + 5)];
  }
  for(var i = 0; i < enemyData.length; i++){
    enemyData[i]=randomHelper();
  }
  moveEnemies(enemyData);
};

var drag = d3.behavior.drag()  
             .on('dragstart', function() { player.style('fill', '#94778B'); })
             .on('drag', function() { player.attr('cx', function(){
                                                          if(d3.event.x <= 0) {
                                                            return 10;
                                                          } else if(d3.event.x >= 500) {
                                                            return 490;
                                                          } else {
                                                            return d3.event.x;
                                                          }})
                                            .attr('cy', function(){
                                                          if(d3.event.y <= 0) {
                                                            return 10;
                                                          } else if(d3.event.y >= 500) {
                                                            return 490;
                                                          } else {
                                                            return d3.event.y;
                                                          }}); })
             .on('dragend', function() { player.style('fill', '#54494B'); });

var distanceHelper = function(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(Math.abs(x1-x2), 2) + Math.pow(Math.abs(y1-y2), 2));
  };

var checkCollisions = function(){
  enemies.each(function(el){
    // console.log(el[0]);
    // console.log(el[1]);
    // console.log(distanceHelper(el[0], el[1], parseInt(player.attr('cx')), parseInt(player.attr('cy'))));
    if(distanceHelper(el[0], el[1], parseInt(player.attr('cx')), parseInt(player.attr('cy'))) < 20){
      player.style('fill', '#'+(Math.random()*0xFFFFFF<<0).toString(16));
      console.log('COLLISION');
    }
  });
};



initialize(numberEnemies, enemyData);

setInterval(function() {
  newEnemyData();
  }, 1000);

setInterval(function() {
  checkCollisions();
  }, 50);