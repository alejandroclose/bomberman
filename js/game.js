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
            ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","-","-"]];

function Game(){

}

function createGameBoard(){
  for(var row = 0; row < grid.length; row++){
    for(var col = 0; col < grid[row].length; col++){
      // console.log("row", row);
      // console.log("column", col);
      if(grid[row][col]==="*"){
        $('#playing-board').append($(`<div class="stone">`).attr('data-row', row).attr('data-col',col));
      }
      else if(grid[row][col]==="x"){
        $('#playing-board').append($(`<div class="bush">`).attr('data-row', row).attr('data-col',col));
      }
      else if(grid[row][col]==="-"){
        $('#playing-board').append($(`<div class="grass">`).attr('data-row', row).attr('data-col',col));
      }
    }
  }

}
createGameBoard();


function Player(){
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

Player.prototype.throwBomb = function(){
  var colPosition = $('.player').data().col;
  var rowPosition = $('.player').data().row;
  var bomb = $('[data-col="' + colPosition + '"][data-row="' + rowPosition + '"]').append($(`<div class="bomb">`));
  setTimeout(explotion,3000);
}


window.addEventListener('keydown',handleKey);
// Haciendo Click  window.addEventListener('click', Player.prototype.moveDown);

function handleKey(){
  if (event.key === "s"){
    Player.prototype.moveDown();
  }
  else if (event.key === "w"){
    Player.prototype.moveUp();
  }
  else if (event.key === "a"){
    Player.prototype.moveLeft();
  }
  else if (event.key === "d"){
    Player.prototype.moveRight();
  }
}

window.addEventListener('keydown', handleBomb);

function handleBomb(){
  if (event.key === "b"){
    Player.prototype.throwBomb();
  }
}

function explotion(){
  alert("Boom!");
  var cellCol = $('.bomb').parent().data().col;
  var cellRow = $('.bomb').parent().data().row;
  var rightCol = cellCol + 1;
  var leftCol = cellCol - 1;
  var upperRow = cellRow - 1;
  var lowerRow = cellRow + 1;

  //Choose right cell
  if ($('[data-col="' + rightCol + '"][data-row="'+ cellRow + '"]').hasClass('bush')){
    this.position = $('[data-col="' + rightCol + '"][data-row="' + cellRow + '"]').removeClass().addClass("grass");
  }
  // Choose left cell
  if ($('[data-col="' + leftCol + '"][data-row="'+ cellRow + '"]').hasClass('bush')){
    this.position = $('[data-col="' + leftCol + '"][data-row="' + cellRow + '"]').removeClass().addClass("grass");
  }
  // Choose upper cell
  if ($('[data-col="' + cellCol + '"][data-row="'+ upperRow + '"]').hasClass('bush')){
    this.position = $('[data-col="' + cellCol + '"][data-row="' + upperRow + '"]').removeClass().addClass("grass");
  }
  // Choose lower cell
  if ($('[data-col="' + cellCol + '"][data-row="'+ lowerRow + '"]').hasClass('bush')){
    this.position = $('[data-col="' + cellCol + '"][data-row="' + lowerRow + '"]').removeClass().addClass("grass");
  }
  $('.bomb').remove();


}