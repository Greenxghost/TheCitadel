(function dimensionalShift(){
  var divsize = ((Math.random()*100) + 50).toFixed();

  var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
  var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

  $('#phasing').css({
    'position':'absolute',
    'left':posx+'px',
    'top':posy+'px',
    'display':'none'
  }).appendTo( 'body' ).fadeIn(500).delay(1200).fadeOut(700, function(){
    dimensionalShift();
  });
})();
