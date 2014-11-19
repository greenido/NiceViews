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
  $timeData = $connection->get('statuses/user_timeline', array('screen_name' => 'greenido'));
  //echo "<h2>Time line</h2>";
  echo(json_encode($timeData));
}
catch (Exception $exc) {
  error_log("Could not fetch tweets :( ERR: " . $exc->getTraceAsString());  
  echo ('[{"ERR":"Could not fetch tweets: "' . $exc->getMessage() . '}]');
}
