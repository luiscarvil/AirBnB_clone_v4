const dicCheck = {};
$(document).on('change', 'input[type=checkbox]', function () {
  if ($(this).is(':checked')) {
    dicCheck[$(this).attr('data-id')] = $(this).attr('data-name');
    console.log(dicCheck);
  } else {
    delete dicCheck[$(this).attr('data-id')];
    console.log(dicCheck);
  }
  if (Object.values(dicCheck).length === 0) {
    $('.amenities h4').html('&nbsp;');
  } else {
    $('.amenities h4').text(Object.values(dicCheck).join(', '));
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
$.ajax({
  type: 'POST',
  url: 'http://localhost:5001/api/v1/places_search/',
  data: JSON.stringify({}),
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    console.log(data);
    /**
    for (let i = 0; i < data.length; i++) {
    }
    */
  }
});
