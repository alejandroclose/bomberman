function Bomb(position) {
  this.position = {
    x: position.x ,
    y: position.y,
  };
}

Bomb.prototype.whereIs = function() {
  console.log('x', this.position.x)
  console.log('y', this.position.y)
}


