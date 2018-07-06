function Player() {
  this.position = {
    x: 1,
    y: 1,
  };
  this.bombs = [];
  this.bombsThrown = 0;
  this.maxBombs = 13;
  this.lives = 3;
  this.score = 0;
}

Player.prototype.moveUp = function() {
  var currentColPosition = this.position.x;
  var newColPosition = currentColPosition - 1;
  if($(`[data-col=${this.position.y}][data-row=${newColPosition}]`).hasClass('grass')){
    this.position.x--;
    this.score = this.score + 1;
  }

}
Player.prototype.moveDown = function() {
  var currentColPosition = this.position.x;
  var newColPosition = currentColPosition + 1;
  if($(`[data-col=${this.position.y}][data-row=${newColPosition}]`).hasClass('grass')){
    this.position.x++;
    this.score = this.score + 1;
  }

}
Player.prototype.moveLeft = function() {
  var currentRowPosition = this.position.y;
  var newRowPosition = currentRowPosition - 1;
  if($(`[data-col=${newRowPosition}][data-row=${this.position.x}]`).hasClass('grass')){
    this.position.y--;
    this.score = this.score + 1;
  }
}

Player.prototype.moveRight = function() {
  var currentRowPosition = this.position.y;
  var newRowPosition = currentRowPosition + 1;
  if($(`[data-col=${newRowPosition}][data-row=${this.position.x}]`).hasClass('grass')){
    this.position.y++;
    this.score = this.score + 1;
  }
}
Player.prototype.whereAmI = function() {
  console.log('x', this.position.x)
  console.log('y', this.position.y)
}







