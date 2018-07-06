window.onload = function () {
  var game = new Game();

  // start button
  $('#btn-start').on('click', function () {
    $('#start').addClass('disable');
    $('#game').addClass('game-screen');
    $('#game').removeClass('disable');
    game.start();
  });

  //restart button
  $('.restart').on('click', function () {
    window.location.reload(true);
  });
}