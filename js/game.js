var grid = [["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
            ["*","-","-","-","-","x","-","-","-","-","-","-","-","-","-","-"],
            ["*","-","*","x","*","-","*","-","*","-","*","-","*","-","*","-"],
            ["*","-","x","-","-","x","-","-","-","x","x","-","-","-","-","x"],
            ["*","x","*","x","*","-","*","-","*","-","*","-","*","x","*","x"],
            ["*","x","-","-","-","-","-","-","-","-","-","x","x","-","-","x"],
            ["*","*","-","*","x","*","x","*","x","*","x","*","-","*","-","*"],
            ["*","x","-","-","x","x","-","-","x","-","x","-","-","-","-","-"],
            ["*","-","*","x","*","-","*","-","*","-","*","-","*","x","*","*"],
            ["*","x","-","-","-","-","-","-","-","-","-","x","x","x","-","*"],
            ["*","*","-","*","x","*","x","*","-","*","-","*","-","*","x","*"],
            ["*","-","*","x","x","-","x","-","x","-","x","-","x","x","x","x"],
            ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","F","F"]];

            
function Game(){
  this.player = new Player();
  this.intervalGame = undefined;
  this._update();
}

Game.prototype.start = function(){
  this.renderGameBoard();
  this.scoreBoard();
  this.renderPlayer();
  this._assignControlsToKeys();
}

Game.prototype.scoreBoard = function() {
  $('.sb-lives').html(this.player.lives);
  $('.sb-bombs').html(this.player.bombs.length);
}

Game.prototype.renderGameBoard = function() {
  for(var row = 0; row < grid.length; row++){
    for(var col = 0; col < grid[row].length; col++){
      if(grid[row][col]==="*"){
        $('#playing-board').append($(`<div class="stone">`).attr('data-row', row).attr('data-col',col));
      }
      else if(grid[row][col]==="x"){
        $('#playing-board').append($(`<div class="bush">`).attr('data-row', row).attr('data-col',col));
      }
      else if(grid[row][col]==="-"){
        $('#playing-board').append($(`<div class="grass">`).attr('data-row', row).attr('data-col',col));
      }
      else if(grid[row][col]==="F"){
        $('#playing-board').append($(`<div class="finish">`).attr('data-row', row).attr('data-col',col));
      }
    }
  }
}

Game.prototype.renderPlayer = function(){
  $(`[data-col=${this.player.position.y}][data-row=${this.player.position.x}]`).removeClass().addClass("player");
}

Game.prototype.renderBombs = function() {
    var bombs = this.player.bombs;
    for (var i=0;i < bombs.length; i++) {
      $(`[data-col=${bombs[i].position.y}][data-row=${bombs[i].position.x}]`).removeClass().addClass("bomb");
    } 
}

Game.prototype._update = function () {
  this.intervalGame = setInterval(function(){
    this.clean();
    this.renderGameBoard();
    this.renderPlayer();
    this.renderBombs();
    this.scoreBoard();
  }.bind(this), 60)
}

Game.prototype.clean = function() {
  $('#playing-board').empty()
}

Game.prototype._assignControlsToKeys = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 38: //arrow up
        this.player.moveUp();
        break;
      case 40: //arror down
        this.player.moveDown();
        break;
      case 37: //arror left
        this.player.moveLeft();
        break;
      case 39: //arrow right
        this.player.moveRight();
        break; 
      case 66: //b key
        this.putBomb();
        break; 
    }
  }.bind(this);
}

Game.prototype.putBomb = function() {
  console.log("Tic")
  if(this.player.bombs.length < this.player.maxBombs){
    this.bomb = new Bomb(this.player.position);
    this.player.bombs.push(this.bomb);
  } 
  setTimeout(function(){
    this.player.bombs.shift();
  }.bind(this), 1000)
  this.explosion();
}

Game.prototype.explosion = function(){
  var self = this;
  setTimeout(function(){
    console.log("Boom!");
    var playerCol = this.player.position.y;
    var playerRow = this.player.position.x;
    var bombCol = this.bomb.position.y;
    var bombRow = this.bomb.position.x;
    var bombUpperRow = this.bomb.position.x - 1;
    var bombRightCol = this.bomb.position.y + 1;
    var bombLowerRow = this.bomb.position.x + 1;
    var bombLeftCol = this.bomb.position.y - 1;
    
    //remove bushes up
    if($(`[data-col=${this.bomb.position.y}][data-row=${bombUpperRow}]`).hasClass('bush')){
      grid[this.bomb.position.x-1][this.bomb.position.y] = "-";
    }
   
    //remove bushes right
    if($(`[data-col=${bombRightCol}][data-row=${this.bomb.position.x}]`).hasClass('bush')){

      grid[this.bomb.position.x][this.bomb.position.y + 1] = "-";
    }

    //remove bushes down
    if($(`[data-col=${this.bomb.position.y}][data-row=${bombLowerRow}]`).hasClass('bush')){
      grid[this.bomb.position.x + 1][this.bomb.position.y] = "-";
    }

    //remove bushes left
    if($(`[data-col=${bombLeftCol}][data-row=${this.bomb.position.x}]`).hasClass('bush')){
      grid[this.bomb.position.x][this.bomb.position.y - 1] = "-";
    }

    //kill bomberman over bomb
    if((bombCol == playerCol) && (bombRow == playerRow)){
      this.player.lives = this.player.lives - 1;
      console.log(this.player.lives);
      console.log("over");
    }

    //kill bomberman Upper Row
    if ((playerCol == bombCol) && (playerRow == bombUpperRow)){
      this.player.lives = this.player.lives - 1;
      console.log(this.player.lives);
      console.log("upper");
    }

    //kill bomberman Right Col
    if ((playerCol == bombRightCol) && (playerRow == bombRow)){
      this.player.lives = this.player.lives - 1;
      console.log(this.player.lives);
      console.log("right");
    }

    //kill bomberman Lower Row
    if ((playerCol == bombCol) && (playerRow == bombLowerRow)){
      this.player.lives = this.player.lives - 1;
      console.log(this.player.lives);
      console.log("lower");
    }

    //kill bomberman Left Col
    if ((playerCol == bombLeftCol) && (playerRow == bombRow)){
      this.player.lives = this.player.lives - 1;
      console.log(this.player.lives);
      console.log("left");
    }
  }.bind(this), 1000)
    
}


/*
Game.prototype.throwBomb = function(){
  this.bomb = new Bomb();
  this.bomb.drawBomb();
}
*/

/* function Player(){
  this.position = $('[data-col=1][data-row=1]').removeClass().addClass("player");
}
Player();


Player.prototype.moveRight = function(){
  var colPosition = $('.player').data().col;
  var rowPosition = $('.player').data().row;
  var newColPosition = colPosition + 1;
  var newRowPosition = rowPosition;
  if ($('[data-col="' + newColPosition + '"][data-row="'+ newRowPosition + '"]').hasClass('grass')){
    this.position = $('[data-col="' + colPosition + '"][data-row="' + rowPosition + '"]').removeClass().addClass("grass");
    this.position = $('[data-col="' + newColPosition + '"][data-row="'+ newRowPosition + '"]').removeClass().addClass("player");
  }
}

Player.prototype.moveLeft = function(){
  var colPosition = $('.player').data().col;
  var rowPosition = $('.player').data().row;
  var newColPosition = colPosition - 1;
  var newRowPosition = rowPosition;
  if ($('[data-col="' + newColPosition + '"][data-row="'+ newRowPosition + '"]').hasClass('grass')){
    this.position = $('[data-col="' + colPosition + '"][data-row="' + rowPosition + '"]').removeClass().addClass("grass");
    this.position = $('[data-col="' + newColPosition + '"][data-row="'+ newRowPosition + '"]').removeClass().addClass("player");
  }
}


Player.prototype.moveUp = function(){
  var colPosition = $('.player').data().col;
  var rowPosition = $('.player').data().row;
  var newColPosition = colPosition
  var newRowPosition = rowPosition - 1;
  if ($('[data-col="' + newColPosition + '"][data-row="'+ newRowPosition + '"]').hasClass('grass')){
    this.position = $('[data-col="' + colPosition + '"][data-row="' + rowPosition + '"]').removeClass().addClass("grass");
    this.position = $('[data-col="' + newColPosition + '"][data-row="'+ newRowPosition + '"]').removeClass().addClass("player");
  }
}

Player.prototype.moveDown = function(){
  var colPosition = $('.player').data().col;
  var rowPosition = $('.player').data().row;
  var newColPosition = colPosition
  var newRowPosition = rowPosition + 1;
  if ($('[data-col="' + newColPosition + '"][data-row="'+ newRowPosition + '"]').hasClass('grass')){
    this.position = $('[data-col="' + colPosition + '"][data-row="' + rowPosition + '"]').removeClass().addClass("grass");
    this.position = $('[data-col="' + newColPosition + '"][data-row="'+ newRowPosition + '"]').removeClass().addClass("player");
  }
  
}

*/

// Player.prototype.throwBomb = function(){
//   var colPosition = $('.player').data().col;
//   var rowPosition = $('.player').data().row;
//   var bomb = $('[data-col="' + colPosition + '"][data-row="' + rowPosition + '"]').append($(`<div class="bomb">`));
//   setTimeout(explotion,3000);
// }


// window.addEventListener('keydown',handleKey);
// // Haciendo Click  window.addEventListener('click', Player.prototype.moveDown);

// function handleKey(){
//   if (event.key === "s"){
//     Player.prototype.moveDown();
//   }
//   else if (event.key === "w"){
//     Player.prototype.moveUp();
//   }
//   else if (event.key === "a"){
//     Player.prototype.moveLeft();
//   }
//   else if (event.key === "d"){
//     Player.prototype.moveRight();
//   }
// }

// window.addEventListener('keydown', handleBomb);

// function handleBomb(){
//   if (event.key === "b"){
//     Player.prototype.throwBomb();
//   }
// }

// function explotion(){
//   alert("Boom!");
//   var cellCol = $('.bomb').parent().data().col;
//   var cellRow = $('.bomb').parent().data().row;
//   var rightCol = cellCol + 1;
//   var leftCol = cellCol - 1;
//   var upperRow = cellRow - 1;
//   var lowerRow = cellRow + 1;

//   //Choose right cell
//   if ($('[data-col="' + rightCol + '"][data-row="'+ cellRow + '"]').hasClass('bush')){
//     this.position = $('[data-col="' + rightCol + '"][data-row="' + cellRow + '"]').removeClass().addClass("grass");
//   }
//   // Choose left cell
//   if ($('[data-col="' + leftCol + '"][data-row="'+ cellRow + '"]').hasClass('bush')){
//     this.position = $('[data-col="' + leftCol + '"][data-row="' + cellRow + '"]').removeClass().addClass("grass");
//   }
//   // Choose upper cell
//   if ($('[data-col="' + cellCol + '"][data-row="'+ upperRow + '"]').hasClass('bush')){
//     this.position = $('[data-col="' + cellCol + '"][data-row="' + upperRow + '"]').removeClass().addClass("grass");
//   }
//   // Choose lower cell
//   if ($('[data-col="' + cellCol + '"][data-row="'+ lowerRow + '"]').hasClass('bush')){
//     this.position = $('[data-col="' + cellCol + '"][data-row="' + lowerRow + '"]').removeClass().addClass("grass");
//   }
//   $('.bomb').remove();
// }

// function Countdown(){
//   var maxTime = 30;

//   function timer(){
//     var id = setTimeout(timer,1000);
//     $('.sb-time').html(maxTime);
//     maxTime --;
//     if (maxTime == -1){
//       clearTimeout(id);
//       var gameOver = $('.grass').removeClass().addClass("game-game-over")
//       gameoverMessage();
//     }
//   }
//   timer();
// };
// Countdown();
