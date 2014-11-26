<?php
/**
 * Enable us to fetch pictures from twitter
 *
 * @author Ido Green | @greenido
 * @see https://dev.twitter.com/rest/reference/get/statuses/user_timeline
 *
 */
$user = "";
if (isset($_REQUEST["user"])) {
    $user = $_REQUEST["user"];
} else {
  error_log("Did got any twitter user to work with.");
  return;
}

/* Load Twitter lib files for the OAUTH */
try {
  require_once('twitteroauth/twitteroauth/twitteroauth.php');
  require_once('twitteroauth/config.php');

  /* Create a TwitterOauth object with consumer/user tokens. */
  $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET);

  // call twitter and fetch the JSON
  $timeData = $connection->get('statuses/user_timeline', array('screen_name' => $user));
  echo(json_encode($timeData));
}
catch (Exception $exc) {
  error_log("Could not fetch tweets for user: {$user} ERR: " . $exc->getTraceAsString());  
  echo ('[{"ERR":"Could not fetch tweets: "' . $exc->getMessage() . '}]');
}
