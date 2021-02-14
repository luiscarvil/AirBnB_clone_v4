$(document).ready(function () {
  const dicCheck = {};
  const dicStates = {};
  const dicCities = {};
  $(document).on('change', 'body > div > section.filters > div.amenities > div > ul > li > input[type=checkbox]', function () {
    if ($(this).is(':checked')) {
      dicCheck[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete dicCheck[$(this).attr('data-id')];
    }
    if (Object.values(dicCheck).length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(Object.values(dicCheck).join(', '));
    }
  });

  $(document).on('change','body > div > section.filters > div.locations > div > ul > li > input[type=checkbox]' , function () {
    if ($(this).is(':checked')) {
      dicStates[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete dicStates[$(this).attr('data-id')];
    }
    if (Object.values(dicStates).length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(Object.values(dicStates).join(', '));
    }
    
  });

  $(document).on('change','body > div > section.filters > div.locations > div > ul > li > ul > input[type=checkbox]',  function () {
    if ($(this).is(':checked')) {
      dicCities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete dicCities[$(this).attr('data-id')];
    }
    if (Object.values(dicCities).length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(Object.values(dicCities).join(', '));
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
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $('.places').append(`<article>
          <div class="title_box">
            <h2> ${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} </div>
                  <div class="number_rooms">${place.number_rooms} </div>
                  <div class="number_bathrooms"> ${place.number_bathrooms}</div>
          </div>
                <div class="description">
                ${place.description}
                </div>
        </article>`);
      }
    }
  });
  $('button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(dicCheck), 'states': Object.keys(dicStates), 'cities': Object.keys(dicCities)}), 
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
          $('.places').append(`<article>
            <div class="title_box">
              <h2> ${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} </div>
                    <div class="number_rooms">${place.number_rooms} </div>
                    <div class="number_bathrooms"> ${place.number_bathrooms}</div>
            </div>
                  <div class="description">
                  ${place.description}
                  </div>
          </article>`);
        }
      }
    });
  });
});
