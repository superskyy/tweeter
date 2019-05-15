/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

$('.tweet-container').append($tweet); 

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

function renderTweets() {
	// loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

   
}

function createTweetElement(tweetData) {
	const $tweet = $("<article>")
			.addClass("block")
	const $header = $("<header>")
	// const $parag = $("<p>")
	// const $bottom = $("<footer>")

	const $image = $("<img>").attr('src', tweetData.user.avatars.small).addClass("avatar");
	const $username = $("<div>").text(tweetData.user.name).addClass("name");
	const $handle = $("<div>").text(tweetData.user.handle).addClass("at-sign");
	const $info = $("<p>").text(tweetData.content.text).addClass("tweeter-text")
	const $date = $("<footer>").text(formatTime(tweetData.created_at)).addClass("time")

	// storing info into the header
	$header.append($image).append($username).append($handle)
	// $parag.append($info)
	// $bottom.append($date)


	return $tweet
		.append($header)
		.append($info)
		.append($date)
}