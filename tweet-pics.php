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

  $users = array("mearakallista", "hollyphotobooth", "photojojo", "7x5photo", "InspireMyPhotos", 
      "MagnumPhotos", "Photocritic", "chasejarvis", "NatGeoPhotos", "big_picture", "TelegraphPics");
  $rand_key = array_rand($users, 1);
  $curUser = $rand_key[0];
  error_log("cUser: {$curUser}");

  $timeData = $connection->get('statuses/user_timeline', array('screen_name' => 'BestEarthPix')); 
  $timeData2 = $connection->get('statuses/user_timeline', array('screen_name' => $curUser)); 
  
  $arr = array_merge($timeData2, $timeData);
  shuffle($arr);
  echo(json_encode($arr) );
}
catch (Exception $exc) {
  error_log("Could not fetch tweets :( ERR: " . $exc->getTraceAsString());  
  echo ('[{"ERR":"Could not fetch tweets: "' . $exc->getMessage() . '}]');
}
