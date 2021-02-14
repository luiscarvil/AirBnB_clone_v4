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
$.get('http://localhost:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').remove('available');
  }
}
);
