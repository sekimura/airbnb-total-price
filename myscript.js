function patch(){
  var urlBase = "/rooms/ajax_refresh_subtotal?utf8=%E2%9C%93&";
  var token = $('#csrf-token-meta-tag').attr('content');
  var data = $('.map-search').data('bootstrap-data');

  $('.listing').each(function(i, el) {
    var $el = $(el);
    var id = $el.data('id');
    var qdict = {};
    qdict.authenticity_token = token;
    qdict.checkin = data.checkin;
    qdict.checkout = data.checkout;
    qdict.number_of_guests = data.guests || "1";
    qdict.hosting_id = id;

    var url = urlBase + $.param(qdict);
    $.get(url, function(data) {
      var thePrice = data.total_price_with_fees_and_tax_native;
      $el.find('.price-amount').text(thePrice);
    });
  });
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+patch+')();'));
document.body.appendChild(script);
