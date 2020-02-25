$(document).ready(function() {
  $('[name="text"]').on('keyup', function() {
    if ($(this).val().length > 140) {
      $(this).siblings('.counter').css({color:'red'});
    } else {
      $(this).siblings('.counter').css({color:'black'});
    }
    $(this).siblings('.counter').html(140 - $(this).val().length);
  });
});
