$(document).ready(function() {
  
  $('[name="text"]').on('keyup', function() {
    let tweetLength = $(this).val().length;
    if (tweetLength > 140) {
      $(this).siblings('.counter').addClass('over140');
    } else {
      $(this).siblings('.counter').removeClass('over140');
    }
    $(this).siblings('.counter').html(140 - tweetLength);
  });

});
