function Bomb(position, player) {
  this.position = {
    x: position.x ,
    y: position.y,
  };
  this.player = player;
}

Bomb.prototype.whereIs = function() {
  console.log('x', this.position.x)
  console.log('y', this.position.y)
}


