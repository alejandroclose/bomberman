function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.ctx = options.ctx;
}

Game.prototype._drawBoard = function (){
  for (var columnIndex = 0; columnIndex < this.columns; columnIndex++){
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++){
      this.ctx.fillStyle = config.boardColor;
      this.ctx.fillRect(columnIndex * 10, rowIndex  * 10, 10, 10);
    }
  }
}