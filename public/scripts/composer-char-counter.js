$(document).ready(function() {
  $("textarea").keyup(function() {
  	let Characters = 0;
    Characters = $("textarea").val().length;
   	if (Characters > 140) {
      $(".counter").text(140 - Characters).css({color: "red"});
	} else {
	  $(".counter").text(140 - Characters).css({color: "black"});
	}
  });
});