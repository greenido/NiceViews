//
// Main code of our app.
// 1. Simple fetching of images from insta api
//
// @author: Ido Green | @greenido
// Date: Nov 2014
//

$(document).foundation();


//
// https://api.instagram.com/v1/tags/coffee/media/recent?access_token=fb2e77d.47a0479900504cb3ab4a1f626d174d2d&callback=callbackFunction
//
function fetchFeed(curFeed, curSource) {
  $.ajax({
  url : document.location.protocol + curFeed,
  dataType : 'json',
  success  : function (data) {
    // check if we got something to work on.
    if (data && data.data ) {
      
      var curIndex = 1;
      var mainList = '';
      $.each(data.data, function (i, entry) {
        var when = entry.created_time;
       
        when += " (" + curSource + ")";
        // console.log("-----------" + when + "-------------");
        // console.log("title      : " + entry.title);
        var buttonHTML = "";
        if (entry.caption && entry.caption.text) {
          buttonHTML = '<div class="row">' + 
          '<div class="large-12 columns">' + entry.caption.text + '</div>' +
          '<div class="small-8 small-centered columns round secondary"><span class="smallfont">' + when +
          '</span></div></div>';  
        }
        
        // if ((curIndex % 2) === 0) {
        //   mainList += '<div class="row">'; 
        // }
        
        mainList +=  '<div class="large-12 columns">' + 
                      '<img src="' + entry.images.standard_resolution.url + '" height="640" width="640"/>' +
                      '<a href="' + 
                      entry.link + '" target="_blank" class="medium round button">' + 
                      buttonHTML + '</a></div>';
        // if (curIndex %2 === 0) {
        //   mainList += "</div>";  
        // }

        curIndex++;
      });

      if (curSource.indexOf("Top") > -1) {
        $('#mainlist').html("");
      }
      $('#mainlist').append(mainList);
      
      // if (curSource.indexOf("10") > 1) {
      //   $('#c10').html(mainList);
      // }
      // if (curSource.indexOf("Ynet") > -1) {
      //   $('#c-ynet').html(mainList);
      // }
      // if (curSource.indexOf("2") > -1) {
      //   $('#c-mako').html(mainList);
      // }
    }
  }
});
}

//
//
//
function fetchAllFeeds() {
  $('#mainlist').html("<div id='spinner'><img src='img/ajax-loader.gif' /></div>");
  $('#mainlist10').html("<p><img src='img/ajax-loader.gif' /></p>");
  var top = "proxy.php?url=https://api.instagram.com/v1/media/popular?client_id=218ce81fd3aa49188e4b643556a79559&callback=success";
  fetchFeed(top, "Top");
  
}

// First fetch of all the feeds to the page
fetchAllFeeds();
// fetch new data every 60sec
setInterval(fetchAllFeeds, 60000);

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