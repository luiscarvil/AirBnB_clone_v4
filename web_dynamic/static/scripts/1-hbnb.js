const diccheck = {};
$(document).on('change', 'input[type=checkbox]', function () {
  if ($(this).is(':checked')) {
    diccheck[$(this).attr('data-id')] = $(this).attr('data-name');
  } else {
    delete diccheck[$(this).attr('data-id')];
  }
  if (Object.values(diccheck).length === 0) {
    $('.amenities h4').html('&nbsp;');
  } else {
    $('.amenities h4').text(Object.values(diccheck).join(', '));
  }
});
