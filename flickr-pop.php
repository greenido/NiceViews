<?php
/**
 * Enable us to fetch pictures from Flickr
 *
 * @author Ido Green | @greenido
 * @see for example: https://api.flickr.com/services/feeds/photos_public.gne?tags=snow
 */

$tag = "";
if (isset($_REQUEST["tag"])) {
    $tag = $_REQUEST["tag"];
} else {
  error_log("Did got any Flickr Tag to work with :(");
  return;
}

//
//
//
function getUrl($url) {
  error_log("Fetch:" . $url);
  $handle = fopen($url, "rb");
  $ret = stream_get_contents($handle);
  fclose($handle);
  return $ret;
}

$rssFeed = "https://api.flickr.com/services/feeds/photos_public.gne?tags={$tag}&format=php_serial";
$data = getUrl($rssFeed);

$feedObj = unserialize($data);
//var_dump($feedObj['items']);
$retJson = "{ "; 
foreach ($feedObj['items'] as $key => $value) {
  $retJson .= '"' . $key . '": { "title": "' . $value['title'] .'",';
  $retJson .= ' "date_taken_nice": "' . $value['date_taken_nice'] .'",';
  $retJson .= ' "photo_url": "' . $value['photo_url'] .'" },';
}
$retJson = substr($retJson, 0, strlen($retJson)-1);
$retJson .= " }";

// return the photos as JSON obj.
if ($retJson) {
  echo($retJson) ;
}
else {
  error_log("Could not fetch flickr rss feed: {$rssFeed} ERR: " . $exc->getTraceAsString());  
  echo ('[{"ERR":"Could not fetch flickr tag: {$tag} "' . $exc->getMessage() . '}]');
}



