var grid = [["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
            ["*","-","-","-","-","x","-","-","-","-","-","-","-","-","-","-"],
            ["*","-","-","-","-","-","*","-","*","-","*","-","*","-","*","-"],
            ["*","-","-","-","-","x","-","-","-","x","x","-","-","-","-","x"],
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
}

Game.prototype.start = function(){
  this.renderGameBoard();
  this.renderPlayer();
  this._assignControlsToKeys();
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
  this.renderGameBoard();
  this.renderPlayer();
  this.renderBombs();
}

Game.prototype.clean = function() {
  $('#playing-board').empty()
}

Game.prototype._assignControlsToKeys = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 38: //arrow up
        this.player.moveUp();
        this.clean();
        this._update();

        break;
      case 40: //arror down
        this.player.moveDown();
        this.clean();
        this._update();

        break;
      case 37: //arror left
        this.player.moveLeft();
        this.clean();
        this._update();
        break;
      case 39: //arrow right
        this.player.moveRight();
        this.clean();
        this._update();
        break; 
      case 66: //b key
        this.player.throwBomb();
        break; 
    }
  }.bind(this);
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
