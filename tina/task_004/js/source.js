$(document).ready(function() {
  $('.avatar').click(function () {
    // Get the character of what was clicked
    var character = $(this).data('character');

    // Hide any span or h1 elements
    $('#description span, h1').hide();

    // Show only elements that contain the corresponding data-character
    // of the one we clicked
    $('#description [data-character="' + character + '"]').show();
  });
  // Click the first avatar when the page loads
  $('.avatar').get(0).click();
});
