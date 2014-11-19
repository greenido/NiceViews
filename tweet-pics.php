<?php
/**
 * Enable us to fetch pictures from twitter
 *
 * @author Ido Green | @greenido
 * @see https://dev.twitter.com/rest/reference/get/statuses/user_timeline
 *
 */

/* Load Twitter lib files for the OAUTH */
try {
  require_once('twitteroauth/twitteroauth/twitteroauth.php');
  require_once('twitteroauth/config.php');

  /* Create a TwitterOauth object with consumer/user tokens. */
  $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET);

  /* If method is set change API call made. Test is called by default. 
  $content = $connection->get('account/verify_credentials'); */

  /* Some example calls */
  $timeData = $connection->get('statuses/user_timeline', array('screen_name' => 'BestEarthPix')); //flickr
  $timeData2 = $connection->get('statuses/user_timeline', array('screen_name' => 'photojojo')); //flickr
  $arr = array_merge($timeData, $timeData2);
  // amazingpics
  //echo "<h2>Time line</h2>";
  echo(json_encode($arr));
}
catch (Exception $exc) {
  error_log("Could not fetch tweets :( ERR: " . $exc->getTraceAsString());  
  echo ('[{"ERR":"Could not fetch tweets: "' . $exc->getMessage() . '}]');
}

/*
twitter.com/petapixel
Petapixel is a brilliantly curated blog that delivers daily nuggets of interesting, quirky and undiscovered examples of photography and photo art.

twitter.com/photojojo
The team behind Photojojo clearly love what they’re doing: the fun side of photography comes through in every tweet.

twitter.com/LightStalking
Another photography Twitter feed that just seems to get the daily blend right: image collections, practical tips and good conversations.

twitter.com/amazingpics
As the name suggests, you’ll find links to some amazing photography here.

twitter.com/photoblggr
The Photography Blogger offers curated photo collections that generally focus on unusual subjects.

twitter.com/big_picture
The Big Picture is a blog put together by the photo editors of The Boston Globe. Follow the daily links posted in this Twitter feed to large-scale topical photo galleries.

twitter.com/TelegraphPics
Photo galleries and daily news pictures from The Daily Telegraph.

twitter.com/NatGeoPhotos
Daily photo feed from National Geographic.

twitter.com/nytimesphoto
The photography blog of the New York Times tweets news pictures and high-quality, though-provoking photojournalism.

twitter.com/InspireMyPhotos
No pictures – just inspirational quotes that will make you think twice about photography.

twitter.com/7x5photo
A reliably good mix of photographer profiles, imaging technique and commentary.

twitter.com/MagnumPhotos
The legendary photographic cooperative posts new and classic pictures and collections.

twitter.com/Photocritic
Haje Jan Kamps does a great line in ‘found’ content and though-provoking commentary. He’s also sociable, which is a good thing for a social network…

twitter.com/chasejarvis
/*