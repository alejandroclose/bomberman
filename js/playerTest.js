function Player() {
  this.position = {
    x: 0,
    y: 0,
  };
}

Player.prototype.moveUp = function() {
  this.position.y--
  fasd
}
Player.prototype.moveDown = function() {
  this.position.y++
}
Player.prototype.moveLeft = function() {
  this.position.x--
}
Player.prototype.moveRight = function() {
  this.position.x++
}
Player.prototype.whereAmI = function() {
  console.log('x', this.position.x)
  console.log('y', this.position.y)
}

