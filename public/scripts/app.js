/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
const Data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
  let value = [];
  for (let i = 0; i < newTweets.length; i++) {
  	value.push(createTweetElement(newTweets[i]));  
  }
	return $('.tweet-container').append(value); 
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
	// renderTweets(Data);

	$(".searchForm").submit((event) =>{     
	event.preventDefault();
	let $form = $(this),
	tweet = $form.find("textarea[name='text']").val(),
	url = $form.attr("action");
		$.post("/tweets",{text: tweet}).done(data => {
			// $("textarea").value("").trigger("keyup");
			loadTweets();
		});
	});

	function loadTweets() {
		$.ajax({
			url: "/tweets",
			method: "GET"
		})
		.then(function (tweets) {
			$(".tweet-container").empty();
			renderTweets(tweets);
		})
	}

});