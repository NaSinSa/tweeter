$(document).ready(function() {
  
  $('[name="text"]').on('keyup', function() {       //checking tweet input length
    let tweetLength = $(this).val().length;

    if (tweetLength > 140) {
      $(this).siblings('.counter').addClass('over140');
    } else {
      $(this).siblings('.counter').removeClass('over140');
    }

    $(this).siblings('.counter').html(140 - tweetLength);
  });

  $(window).on('scroll', function() {     //when scroll down, toggle-up-to-top button will appear.
    if ($(window).scrollTop() !== 0) {
      $('[name="toggleUpArrow"]').fadeIn('fast');
      $('nav div').fadeOut('fast');
    }
  })

  $('[name="toggleUpArrow"]').on('click', function() {
    $(window).scrollTop(0)
    $('[name="toggleUpArrow"]').fadeOut('fast');
    $('nav div').fadeIn('fast');
  })
});
