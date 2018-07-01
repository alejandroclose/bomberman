function Player() {
  this.position = {
    x: 1,
    y: 1,
  };
  this.bombs = [];
  this.maxBombs = 3;
  this.lives = 3;
}

Player.prototype.moveUp = function() {
  var currentColPosition = this.position.x;
  var newColPosition = currentColPosition - 1;
  if($(`[data-col=${this.position.y}][data-row=${newColPosition}]`).hasClass('grass')){
    this.position.x--;
  }

}
Player.prototype.moveDown = function() {
  var currentColPosition = this.position.x;
  var newColPosition = currentColPosition + 1;
  if($(`[data-col=${this.position.y}][data-row=${newColPosition}]`).hasClass('grass')){
    this.position.x++;
  }

}
Player.prototype.moveLeft = function() {
  var currentRowPosition = this.position.y;
  var newRowPosition = currentRowPosition - 1;
  if($(`[data-col=${newRowPosition}][data-row=${this.position.x}]`).hasClass('grass')){
    this.position.y--;
  }
}

Player.prototype.moveRight = function() {
  var currentRowPosition = this.position.y;
  var newRowPosition = currentRowPosition + 1;
  if($(`[data-col=${newRowPosition}][data-row=${this.position.x}]`).hasClass('grass')){
    this.position.y++;
  }
}
Player.prototype.whereAmI = function() {
  console.log('x', this.position.x)
  console.log('y', this.position.y)
}

Player.prototype.throwBomb = function(){
  
}

// Player.prototype.putBomb = function(){
//   return new Bomb(this.position)
// }







