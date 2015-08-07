

$(function() {


    // Each time the button element is clicked.
$('button').on('click', function() {
 
  // Take the number in textbox, convert it into integer.
  var num = parseInt($('.amount-input').val(), 10);
  
  // Take the URL from the textbox.
  var url = $('.url-input').val();
  
  if (url.length === 0) {
     alert("Please enter an URL!");
     return;
  }

  // Make a call to Imgur API.
  $.ajax({
    type: 'GET',
    dataType: 'json',
    // Add the URL to the 
    url: 'https://api.imgur.com/3/gallery/t/' + url,
    headers: {
      Authorization: 'Client-ID 13891b6738bbcf0'
    },
    success: function (response) {
      
        // Iterate through each response.data.items
        // because data.items is an array containing all images.
        response.data.items.filter(function (image) {
            // If image.is_album is not false, return it.
            return image.is_album === false;
        }).filter(function (image, key) {
            // Now we have albums filtered out.
            // Filter image position to be smaller than what user entered,
            // so it will filter the images to the requested limit.
            return key < num;
        }).forEach(function (image) {
            // Now, we have everything filtered and have num amount of images
            // in the array. Create an img tag and append it to the div.
            $('#imgur-gal').append(
                $("<img/>", { src: image.link })
            );
        });
    }
  });
});

});