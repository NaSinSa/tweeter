$(document).ready(function() {
  const tweetInput = '[name="text"]';
  $(tweetInput).on('keyup', function() {
    if ($(this).val().length > 140) {
      $(this).val($(this).val().substring(0, 140));
    }
    $(this).siblings('.counter').html(140 - $(this).val().length);
  });
});
