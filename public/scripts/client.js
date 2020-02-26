/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const whenTheTweetIsPosted = function(nb) {
  let days = Math.ceil((new Date() - nb) / 1000 / 60 / 60 / 24);
  return `${days} days ago`
};

const renderTweets = function(tweets) {

  for (let ele of tweets) {
    // $('.tweet-container').append(createTweetElement(ele));
    createTweetElement(ele);
  }
};

const createTweetElement = function(tweet) {
  let obj = tweet;
  let keys = Object.keys(tweet);
  // let article = 
  // `
  // <article>
  //   <header>
  //     <h3><img src=${obj.user.avatars}> ${obj.user.name}</h3>
  //     <span class='hide'>${obj.user.handle}</span>
  //   </header>
  
  //   <p>${obj.content.text}</p>
  
  //   <footer>
  //     <p>${whenTheTweetIsPosted(obj.created_at)}</p>
  //     <button>flags</button>
  //   </footer>
  // </article>`;
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
  $footer.append($pTweet.text(whenTheTweetIsPosted(obj.created_at)));
  $footer.append($button);
  
  $tweet
    .append($header)
    .append($pDays.text(obj.content.text))
    .append($footer)
  
    return $('.tweet-container').prepend($tweet)
    // return article;
  };
  
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(data) {
      renderTweets(data)
    }
  });
};

$(document).ready(function() {

  $('.tweeter').on('submit', function(event) {
    event.preventDefault();
    let tweet = $( this ).serialize();
    if ($('textarea').val().length > 140) {
      alert('The tweet is too long!');
    } else if ($('textarea').val().length === 0) {
      alert('You should tweet somthing!');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweet,
      })
      .then((data) => {
        loadTweets(data);
        $('textarea').val("");
      })
    }
  });
  
  $('nav div').on('click', function(event) {
    $('.tweeter').toggleClass('slide');
  })
});

