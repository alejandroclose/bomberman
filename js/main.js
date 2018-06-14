window.onload = function(){
  var canvas = document.getElementById('bomberman');
  var ctx = canvas.getContext('2d');

  var game = new Game({
    rows: canvas.width /10,
    columns: canvas.height /10,
    ctx: ctx,
  });

  game.start();
}