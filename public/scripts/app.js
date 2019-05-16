/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

$("button").click(function(){
  $(".new-tweet").slideToggle(function() {
    $("textarea").focus()
  });
});




function formatTime (time) {
	var diff = Math.floor((Date.now() - time) / 1000);
  var interval = Math.floor(diff / 31536000);

  if (interval >= 1) {
    return interval + " years" + " ago";
  }
  interval = Math.floor(diff / 2592000);
  if (interval >= 1) {
    return interval + " months" + " ago";
  }
  interval = Math.floor(diff / 604800);
  if (interval >= 1) {
    return interval + " weeks" + " ago";
  }
  interval = Math.floor(diff / 86400);
  if (interval >= 1) {
    return interval + " days" + " ago";
  }
  interval = Math.floor(diff / 3600);
  if (interval >= 1) {
    return interval + " hours" + " ago";
  }
  interval = Math.floor(diff / 60);
  if (interval >= 1) {
    return interval + " minutes" + " ago";
  }
  return "<1m" + " ago";
}

function renderTweets(newTweets) {
  for (let i in newTweets) {
  	$('.tweet-container').prepend(createTweetElement(newTweets[i]));  
  }
}

function createTweetElement(tweetData) {
	const $tweet = $("<article>").addClass("block")
	const $header = $("<header>")

	const $image = $("<img>").attr('src', tweetData.user.avatars.small).addClass("avatar");
	const $username = $("<div>").text(tweetData.user.name).addClass("name");
	const $handle = $("<div>").text(tweetData.user.handle).addClass("at-sign");
	const $info = $("<p>").text(tweetData.content.text).addClass("tweeter-text")
	const $date = $("<footer>").text(formatTime(tweetData.created_at)).addClass("time")

	// storing info into the header
	$header.append($image).append($username).append($handle)

	return $tweet
		.append($header)
		.append($info)
		.append($date)
	}

	$(".searchForm").submit((event) => {     
  event.preventDefault();

  if (!$("textarea").val()) {
    $(".empty-hide-show").slideDown().fadeOut(2000)
  } else if ($("textarea").val().length > 140) {
    $(".limit-hide-show").slideDown().fadeOut(2000)
  } else {
    let $form = $(this),
    tweet = $form.find("textarea[name='text']").val(),
    url = $form.attr("action");

		$.post("/tweets",{text: tweet}).done(data => {
			loadTweets();
		});
    }
	});

	function loadTweets() {
		$.ajax({
			url: "/tweets",
			method: "GET"
		})
		.then(function (tweets) {
			$("textarea").val("");
			renderTweets(tweets);
		})
	}
  renderTweets(loadTweets());

});