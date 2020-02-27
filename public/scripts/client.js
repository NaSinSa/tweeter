/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const whenIsTheTweetPosted = function(nb) {
  let inSecond = (new Date() - nb) / 1000;
  if (inSecond < 60) {
    return `${Math.round(inSecond)} second${timeUnitPluralChecker(Math.round(inSecond))}ago`;
  } else if (inSecond / 60 < 60) {
    return `${Math.round(inSecond / 60)} minute${timeUnitPluralChecker(Math.round(inSecond / 60))}ago`;
  } else if (inSecond / 60 / 60 < 24) {
    return `${Math.round(inSecond / 60 / 60)} hour${timeUnitPluralChecker(Math.round(inSecond / 60 / 60))}ago`;
  } else {
    return `${Math.round(inSecond / 60 / 60 / 24)} day${timeUnitPluralChecker(Math.round(inSecond / 60 / 60 / 24))}ago`;
  }
};

const timeUnitPluralChecker = function(time) {
  if (Math.round(time) > 1) {
    return 's ';
  } else {
    return ' ';
  }
};

const renderTweets = function(tweets) {

  for (let ele of tweets) {
    createTweetElement(ele);
  }
};

const createTweetElement = function(tweet) {
  let obj = tweet;
  let keys = Object.keys(tweet);

  let $tweet = $('<article>');
  let $header = $('<header>');
  let $span = $('<span>').addClass('hide');
  let $img = $('<img>', {src: obj.user.avatars});
  let $h3 = $('<h3>');
  let $pTweet = $('<p>');
  let $pDays = $('<p>');
  let $footer = $('<footer>');
  let $button = $('<button>')

  $button.text('icons');
  $span.text(obj.user.handle);
  $h3.text(obj.user.name);
  $header.append($h3.prepend($img));
  $header.append($span);
  $footer.append($pTweet.text(whenIsTheTweetPosted(obj.created_at)));
  $footer.append($button);
  
  $tweet
    .append($header)
    .append($pDays.text(obj.content.text))
    .append($footer)
  
  return $('.tweet-container').prepend($tweet)
};
  
const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: function(data) {
      renderTweets(data);
    }
  });
};

$(document).ready(function() {

  $('.tweeter').on('submit', function(event) {
    event.preventDefault();
    let tweet = $( this ).serialize();
    $('p[class="tweetErrorMsg"]').slideUp();

    if ($('textarea').val().length > 140) {
      $('p[name="tooLong"]').slideDown();
    } else if ($('textarea').val().length === 0) {
      $('p[name="noInput"]').slideToggle();
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweet,
      })
      .then((data) => {
        loadTweets(data);
        $('textarea').val("");
        $('.counter').text('140');
      });
    }
  });
  
  $('nav div').on('click', function(event) {
    $('.tweeter').slideToggle(()=>{
      $('textarea').focus();
    });
  })
});

