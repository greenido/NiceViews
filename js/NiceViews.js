//
// Nice Views code
//
// @author: Ido Green | @greenido
// Date: Nov 2014
//

function unixTimeToReadable(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000);
  
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  
  var year = date.getFullYear();
  var month = date.getMonth() +1;
  var day = date.getDate();
  // will display time in 10:30:23 format
  var formattedTime =  "(" + day + "/" + month + "/" + year + ") " + hours + ':' + minutes + ':' + seconds;
  return formattedTime;
}

//
// Start the party
//
$(function() {
  console.log("-- Starting the party")
  
});
            

