
var numberEnemies = prompt("How many enemies can you handle?!");

if(typeof parseInt(numberEnemies) !== 'number') {
  numberEnemies = 5;
}

var svg = d3.select('.board').append('svg')
            .attr('width', '500')
            .attr('height', '500');


var enemyData = new Array(numberEnemies);

var enemies;
var collisions = 0;

var player;
var count;
var highScore;

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
  count = 0;
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

var prevCollision = false;

var resetBoard = function() {
  d3.select('.board').style('background-image', 'none');
}

var moveEnemies = function(enemyData) {

  currentCollision = false;

  enemies.data(enemyData)
         .transition()
         .tween("custom", function() {
            var endPosX = this.__data__[1];
            var startPosX = this.cx.animVal.value;
            var endPosY = this.__data__[0];
            var startPosY = this.cy.animVal.value;
            var i = d3.interpolate(startPosX, endPosX);
            var j = d3.interpolate(startPosY, endPosY);
            return function(t) {
              if(Math.abs(i(t) - player.attr('cx')) < 20 && Math.abs(j(t) - player.attr('cy')) < 20) {
                currentCollision = true;
                d3.select('.board').style('background-image', 'url(gta_wasted.png)');
                setTimeout(function() {
                  resetBoard();
                }, 75);
                if(count > highScore || highScore === undefined) {
                  highScore = count;
                }
                d3.select('.highscore').selectAll('span').text(highScore);
                count = 0;
                if(prevCollision !== currentCollision) { 
                  collisions++;
                }
                d3.select('.collisions').selectAll('span').text(collisions);
                player.style('fill', '#'+(Math.random()*0xFFFFFF<<0).toString(16));
              }
              prevCollision = currentCollision;
              // d3.select('.board').style('background-image', 'url(space.jpg)');
            };
         })
         .duration(500)
         .attr('cx', function(d){return d[1];})
         .attr('cy', function(d) {return d[0];});
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


initialize(numberEnemies, enemyData);

setInterval(function() {
  newEnemyData();
  }, 1000);


var increaseCount = function() {
  count++;
  d3.select('.current').selectAll('span').text(count);
};

setInterval(function() {
  increaseCount();
}, 100);