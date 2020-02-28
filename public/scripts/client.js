/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const whenIsTheTweetPosted = function(nb) {

  const inSecond = (new Date() - nb) / 1000;

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

  return (Math.round(time) > 1) ? 's ' : ' ';

};

const renderTweets = function(tweets) {

  for (let ele of tweets) {
    createTweetElement(ele);
  }

};

const createTweetElement = function(tweet) {

  let obj = tweet;

  let $tweet = $('<article>');
  let $header = $('<header>');
  let $span = $('<span>').addClass('hide');
  let $avatarImg = $('<img>', {src: obj.user.avatars});
  let $h3 = $('<h3>');
  let $body = $('<body>');
  let $pTweet = $('<p>');
  let $pDays = $('<p>');
  let $footer = $('<footer>');
  let $pIcon = $('<p>')
  let $tweetImg1 = $('<img>', {src: '/images/flag.png', height: '15px', width: '15px', title: 'Flag', alt: 'Flag'});
  let $tweetImg2 = $('<img>', {src: '/images/repeat.png', height: '15px', width: '15px', title: 'Re-tweet', alt: 'Re-tweet'});
  let $tweetImg3 = $('<img>', {src: '/images/heart.png', height: '15px', width: '15px', title: 'Like', alt: 'Like'});

  $span.text(obj.user.handle);
  $h3.text(obj.user.name);
  $header.append($h3.prepend($avatarImg));
  $header.append($span);
  $body.append($pTweet.text(obj.content.text));
  $footer.append($pDays.text(whenIsTheTweetPosted(obj.created_at)));
  $pIcon.append($tweetImg1, $tweetImg2, $tweetImg3);
  $footer.append($pIcon);

  
  $tweet
    .append($header)
    .append($body)
    .append($footer)
  
  return $('.tweet-container').prepend($tweet);

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

    $('p[class="tweetErrorMsg"]').slideUp();        //cleaer an error msg slides in from func below

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
        $('textarea').val('');          // with a valid tweet input, the textarea will be empty
        $('.counter').text('140');      // and the counter will be reset.
      });
    }

  });
  
  $('nav div').on('click', function(event) {      

    $('.new-tweet').slideToggle(()=>{         //a user will be ready to type without clicking the input field.
      $('textarea').focus();
    });

  })
});

