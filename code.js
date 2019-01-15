window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

var scaling_factor = 2;

//get properties of magnifying overlay
$("#magnify").show();
var mag_width = $('#magnify').width();
var mag_height = $('#magnify').height();
$("#magnify").hide();

//set overlay properties
$("#overlay").show();
$("#overlay").css('height', mag_height-4); //quick patch for centering magnified area...couple pixels stuck out to either side of glass
$("#overlay").css('width', mag_width-4);
$("#overlay").hide();

//get coordinates of rectangular area of interest
var rect = document.getElementById("little").getBoundingClientRect();
var left_lim = rect.left;
var right_lim = rect.right;
var lower_lim = rect.top;
var upper_lim = rect.bottom;
function outside(x,y) {
  return ( x<left_lim || x>right_lim || y<lower_lim || y>upper_lim );
}

//main function tracking mouse movement
$( document ).on( "mousemove", function( event ) {
  var x = event.pageX;
  var y = event.pageY;

  //hide images if outside of rectangle --not very efficient
  if (outside(x,y)) {
    $("#magnify").hide();
    $("#overlay").hide();
      $('body').css('cursor', 'default');
  } else {
    //center magnify glass and overlay
    var l = x - mag_width/2;
    var t = y - mag_height/2;
    $("#magnify").css('left', l);
    $("#magnify").css('top', t);
    $("#overlay").css('left', l+2); //quick patch for centering magnified area...couple pixels stuck out to either side of glass
    $("#overlay").css('top', t+2);
    //adjust position of overlay's background image (top left corner of div is 0,0)
    var bkg_left = x - (l+scaling_factor*(x-left_lim));
    var bkg_top = y - (t+scaling_factor*(y-lower_lim));
    var bkg_pos = bkg_left + ' ' + bkg_top;
    $("#overlay").css('background-position', bkg_pos);
  }
});

$("#little").mouseenter(function(){
  //console.log('entered!');
  $("#magnify").show();
  $("#overlay").show();
  $('body').css('cursor', 'none');
});
