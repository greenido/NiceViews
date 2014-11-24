//
// Main code of our app.
// 1. Simple fetching of images from Instagram API
//
// @author: Ido Green | @greenido
// Date: Nov 2014
//

$(document).foundation();


//
// Fetch the popular images from insta
//
function fetchFeed(curFeed, curSource) {
    $.ajax({
    url : document.location.protocol + curFeed,
    dataType : 'json',
    error: function(err) {
      console.error("Could not fetch feed: " + curFeed + " Err: " + JSON.stringify(err));
    },
    success  : function (data) {
      // Check if we got something to work on.
      if (data && data.data ) {        
        var curIndex = 1;
        var mainList = '';
        $.each(data.data, function (i, entry) {
          var when = entry.created_time;
          when += " (" + curSource + ")";
          console.log("-----------" + when + "-------------");
          var buttonHTML = "";
          if (entry.caption && entry.caption.text) {
            var picText = entry.caption.text;
            if (picText.length > 300) {
              picText = picText.substring(0,300) + "...";
            }
          }
           
          var geoMap = "";
          // If we have geo location - let's have a nice little map ;)
          if ( entry.location &&  entry.location.latitude &&  entry.location.longitude ) {
            geoMap = //'<div class="large-6 large-centered columns">' + 
                      '<img border="0" src="https://maps.googleapis.com/maps/api/staticmap?center=' +
                      entry.location.latitude + ',' + entry.location.longitude +
                      '&amp;zoom=8&amp;size=200x200" class="quimby_search_image">' ;
                      //'</div>';
          }  
          // Add the image to our page
          mainList += '<div class="large-6 large-centered columns">' +   
                        '<img src="' + entry.images.standard_resolution.url + '" height="640" width="640"/> ' +
                        '</div>' + 
                        '<div class="large-3 large-centered columns">' + 
                        '<a href="' + entry.link + '" target="_blank" class="button">' + 
                        picText + '<br>' + geoMap + '</a>' + 
                      ' </div>';
          curIndex++;
        });

        // if (curSource.indexOf("Top") > -1) {
        $('#mainlist').html("");
        $('#mainlist').append(mainList);

        // } 
        // else if (curSource.indexOf("Models") > -1) {
        //   $('#models').html("");
        //   $('#models').html(mainList);
        // }

      }
    }
  });
}

//
// Fetch tweets - hopefully with cool images
//
function fetchTweets() {
 $.ajax({
    url : "tweet-pics.php",
    dataType : 'json',
    error: function(err) {
      console.error("Could not fetch tweets. Err: " + JSON.stringify(err));
    },
    success  : function (data) {
      // Check if we got something to work on.
      if (data) {
        var mainList = '';
        $.each(data, function (i, entry) {
          if (entry.entities && entry.entities.media) {
            var when = entry.created_at;
         
          console.log("-----------" + when + "-------------");
          console.log("title      : " + entry.text);
          mainList += '<div class="large-6 large-centered columns">' + 
              '<img src="' + entry.entities.media[0].media_url + '" height="640" width="640"/> ' +
              '</div>' + 
              '<div class="large-3 large-centered columns">' + 
              '<a href="' + entry.entities.media[0].expanded_url +
              '" target="_blank" class="button">'+ entry.text +'</a>' + 
              '<br> ' + when + 
              ' </div>';
          } 
        });
        
        $('#models').html("");
        $('#models').html(mainList);
      
      }
    }
  });
}

function picAround() {
  if (navigator.geolocation) {
        navigator.geolocation.watchPosition(fetchPosition);
  } else {
     console.warn("Cannot get the Geo location :(" );
  }
}

//
function fetchPosition(position) {
    console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude); 
    var geoImgFeed = "proxy.php?url=https://api.instagram.com/v1/media/search?client_id=218ce81fd3aa49188e4b643556a79559" +
            "lat=" + position.coords.latitude  + 
            "long=" + position.coords.longitude+
            "&callback=success";
  

  fetchFeed(geoImgFeed, "Around");
}

//
//
//
function fetchAllFeeds() {
  $('#mainlist').html("<div id='spinner'><img src='img/ajax-loader.gif' /></div>");
  $('#mainlist10').html("<p><img src='img/ajax-loader.gif' /></p>");
  var top = "proxy.php?url=https://api.instagram.com/v1/media/popular?client_id=218ce81fd3aa49188e4b643556a79559&callback=success";
  fetchFeed(top, "Top");
  
  fetchTweets();
  
}

// First fetch of all the feeds to the page
fetchAllFeeds();

// fetch new data every 120sec
setInterval(fetchAllFeeds, 120000);

//
// A nice little clock
//
function updateClock() {
  // Gets the current time
  var now = new Date();

  // Get the hours, minutes and seconds from the current time
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Format hours, minutes and seconds
  if (hours < 10) {
      hours = "0" + hours;
  }
  if (minutes < 10) {
      minutes = "0" + minutes;
  }
  if (seconds < 10) {
      seconds = "0" + seconds;
  }

  // Gets the element we want to inject the clock into
  var elem = document.getElementById('clock');

  // Sets the elements inner HTML value to our clock data
  elem.innerHTML = hours + ':' + minutes + ':' + seconds;

}
setInterval('updateClock()', 500);