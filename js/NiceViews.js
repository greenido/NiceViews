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
  
  // update the setting tab
  var tUsers = 0;
  if (localStorage.getItem("t-users") > 0) {
    tUsers = localStorage.getItem("t-users");  
  }
  tUsers++;
  for (var j = 1; j < tUsers; j++) {
    $("#t-users").append('<div class="small-8 columns"><input type="text" placeholder="e.g. @greenido" value='+ 
      localStorage.getItem("twitter" + j) + '></div>');  
  };


  $("#addbut").click(function() {
    $("#t-users").append('<div class="small-8 columns"><input type="text" placeholder="e.g. @greenido" /></div>');
  })

  $("#cancelset").click(function() {
    $("#panel1").addClass("active");
  });

  $("#saveset").click(function() {
    // save to localStorage
    console.log('-- saving to local storage all the settings --');
    var i=1;
    $("form#setform :input").each(function(){
      var input = $(this); 
      localStorage.setItem("twitter" + i, input.val());
      i++;
    });

    localStorage.setItem("t-users", (i-1));

    $("#panel2").addClass("active");
  });


});
            

