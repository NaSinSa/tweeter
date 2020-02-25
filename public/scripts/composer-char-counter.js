$(document).ready(function() {
  $('[name="text"]').on('keyup', function() {
    if ($(this).val().length > 140) {
      $(this).siblings('.counter').addClass('over140');
    } else {
      $(this).siblings('.counter').removeClass('over140');
    }
    $(this).siblings('.counter').html(140 - $(this).val().length);
  });
});
